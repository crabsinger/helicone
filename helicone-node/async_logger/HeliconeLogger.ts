import { AxiosResponse } from "axios";
import { PassThrough, Readable } from "stream";
import { Helicone } from "../core/HeliconeOpenAIApi";
import { IHeliconeConfiguration } from "../core/IHeliconeConfiguration";
import {
  HeliconeAsyncLogger,
  HeliconeAyncLogRequest,
  Provider,
  ProviderRequest,
} from "./HeliconeAsyncLogger";
import { v4 as uuidv4 } from "uuid";

export interface RequestBody {
  model: string;
  provider?: string;
  prompt?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number;
  stop?: string[];
  presence_penalty?: number;
  frequency_penalty?: number;
  best_of?: number;
  logit_bias?: Record<string, number>;
  meta?: Object;
}

export interface Usage {
  total_tokens: number;
  prompt_tokens: number;
  completion_tokens: number;
}

export interface ResponseBody {
  text: string;
  usage?: Usage;
  index?: number;
  finish_reason?: string;
  logprobs?: Record<string, any>;
  chosen_logprobs?: Record<string, any>;
  tokens?: string[];
  token_logprobs?: number[];
  text_offset?: number;
  context?: string;
  model?: string;
  meta?: Object;
}

export interface ResponseError {
  error: string;
  status?: number;
  body?: Object;
}

export type HeliconeResponse = ResponseError | ResponseBody;

export class HeliconeLogBuilder {
  private response: HeliconeResponse | undefined;
  private startTime: number;
  private endTime: number;
  private meta: Record<string, string>;
  public readonly id: string;

  constructor(private RequestBody: RequestBody) {
    this.startTime = Date.now();
    this.meta = {};
    this.id = uuidv4();
  }

  addResponse(response: HeliconeResponse): HeliconeLogBuilder {
    this.response = response;
    this.endTime = Date.now();
    return this;
  }

  addUser(user: string): HeliconeLogBuilder {
    this.meta = {
      "Helicone-User-Id": user,
    };
    return this;
  }

  private buildMeta(): Record<string, string> {
    return {
      "Helicone-Request-Id": this.id,
      ...this.meta,
    };
  }

  build(): HeliconeAyncLogRequest {
    if (this.response === undefined) {
      throw new Error("Response is undefined");
    }

    return {
      providerRequest: {
        json: this.RequestBody,
        url: "",
        meta: this.buildMeta(),
      },
      providerResponse: {
        json: { ...this.response, model: this.RequestBody.model },
        status: 200,
        headers: {},
      },
      timing: {
        startTime: {
          seconds: Math.trunc(this.startTime / 1000),
          milliseconds: this.startTime % 1000,
        },
        endTime: {
          seconds: Math.trunc(this.endTime / 1000),
          milliseconds: this.endTime % 1000,
        },
      },
    };
  }
}

export class HeliconeLogger {
  protected heliconeConfiguration: IHeliconeConfiguration;
  public helicone: Helicone;
  private logger: HeliconeAsyncLogger;

  constructor(heliconeConfiguration: IHeliconeConfiguration) {
    this.heliconeConfiguration = heliconeConfiguration;
    this.helicone = new Helicone(heliconeConfiguration);
    this.logger = new HeliconeAsyncLogger(heliconeConfiguration);
  }

  submit(request: HeliconeLogBuilder): Promise<AxiosResponse<any, any>> {
    const asyncLogRequest = request.build();
    return this.logger.log(asyncLogRequest, Provider.CUSTOM_MODEL);
  }
}
