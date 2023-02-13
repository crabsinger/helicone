import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { fillPromptRegex, formatBody } from "./prompt_discovery";
// import bcrypt from "bcrypt";
export interface Env {
  SUPABASE_SERVICE_ROLE_KEY: string;
  SUPABASE_URL: string;
}

interface SuccessResult {
  data: string;
  error: null;
}
interface ErrorResult {
  data: null;
  error: string;
}

type Result = SuccessResult | ErrorResult;

function forwardRequestToOpenAi(
  request: Request,
  body?: string
): Promise<Response> {
  let url = new URL(request.url);
  const new_url = new URL(`https://api.openai.com${url.pathname}`);
  return request.method === "GET"
    ? fetch(new_url.href, {
        method: request.method,
        headers: request.headers,
      })
    : fetch(new_url.href, {
        method: request.method,
        headers: request.headers,
        body,
      });
}

async function logRequest({
  dbClient,
  request,
  userId,
  promptId,
  requestId,
  auth,
  body,
}: {
  dbClient: SupabaseClient;
  request: Request;
  userId: string | null;
  promptId: string | null;
  requestId?: string;
  auth: string;
  body?: string;
}): Promise<Result> {
  const json = body ? JSON.parse(body) : {};

  const { data, error } = requestId
    ? await dbClient
        .from("request")
        .insert([
          {
            id: requestId,
            path: request.url,
            body: json,
            auth_hash: await hash(auth),
            user_id: userId,
            prompt_id: promptId,
          },
        ])
        .select("id")
        .single()
    : await dbClient
        .from("request")
        .insert([
          {
            path: request.url,
            body: json,
            auth_hash: await hash(auth),
            user_id: userId,
            prompt_id: promptId,
          },
        ])
        .select("id")
        .single();

  if (error !== null) {
    return { data: null, error: error.message };
  } else {
    return { data: data.id, error: null };
  }
}

async function logResponse(
  dbClient: SupabaseClient,
  requestId: string,

  body: string
): Promise<void> {
  const { data, error } = await dbClient
    .from("response")
    .insert([{ request: requestId, body: JSON.parse(body) }])
    .select("id");
  if (error !== null) {
    console.error(error);
  }
}

function heliconeHeaders(requestResult: Result): Record<string, string> {
  if (requestResult.error !== null) {
    console.error(requestResult.error);
    return {
      "Helicone-Error": requestResult.error,
      "Helicone-Status": "error",
    };
  } else {
    return { "Helicone-Status": "success", "Helicone-Id": requestResult.data };
  }
}
async function hash(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const hashedKey = await crypto.subtle.digest(
    { name: "SHA-256" },
    encoder.encode(key)
  );
  const byteArray = Array.from(new Uint8Array(hashedKey));
  const hexCodes = byteArray.map((value) => {
    const hexCode = value.toString(16);
    const paddedHexCode = hexCode.padStart(2, "0");
    return paddedHexCode;
  });
  return hexCodes.join("");
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const auth = request.headers.get("Authorization");
    if (auth === null) {
      return new Response("No authorization header found!", { status: 401 });
    }

    const isPromptRegexOn = request.headers.get("Helicone-Prompt-Format") !== null;
    const body = isPromptRegexOn ? formatBody(await request.text()) : await request.text();
    const dbClient = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY
    );

    const [response, requestResult] = await Promise.all([
      forwardRequestToOpenAi(request, body),
      logRequest({
        dbClient,
        request,
        userId:
          request.headers.get("Helicone-User-Id")?.substring(0, 128) ??
          request.headers.get("User-Id")?.substring(0, 128) ??
          null,
        promptId:
          request.headers.get("Helicone-Prompt-Id")?.substring(0, 128) ?? null,
        requestId: request.headers
          .get("Helicone-Request-Id")
          ?.substring(0, 128),
        auth,
        body: body === "" ? undefined : body,
      }),
    ]);
    const responseBody = await response.text();
    if (requestResult.data !== null) {
      ctx.waitUntil(logResponse(dbClient, requestResult.data, responseBody));
    }

    return new Response(responseBody, {
      ...response,
      headers: {
        ...heliconeHeaders(requestResult),
        ...response.headers,
      },
    });
  },
};
