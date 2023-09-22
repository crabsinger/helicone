import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  CircleStackIcon,
  CodeBracketIcon,
  LockClosedIcon,
  PencilSquareIcon,
  RectangleStackIcon,
  TagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import NavBarV2 from "../../shared/layout/navbar/navBarV2";
import CodeSnippet from "./codeSnippet";
import { DiffHighlight } from "../welcome/diffHighlight";

const features: {
  title: string;
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
}[] = [
  {
    title: "Custom Properties",
    icon: TagIcon,
  },
  {
    title: "Caching",
    icon: CircleStackIcon,
  },
  {
    title: "Rate Limiting",
    icon: UserIcon,
  },
  {
    title: "Retries",
    icon: ArrowPathIcon,
  },
  {
    title: "Feedback",
    icon: PencilSquareIcon,
  },
  {
    title: "Vault",
    icon: LockClosedIcon,
  },
  {
    title: "Jobs",
    icon: RectangleStackIcon,
  },
  {
    title: "GraphQL",
    icon: CodeBracketIcon,
  },
];

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <NavBarV2 />
      <div className="relative isolate">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_60%_at_top_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={25}
              height={25}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M25 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          />
        </svg>
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-36 flex flex-col space-y-8 sm:space-y-8 items-center justify-center text-center lg:gap-x-10 lg:px-8 antialiased">
          <h1 className="text-4xl sm:text-6xl font-semibold sm:leading-tight max-w-4xl">
            Helicone is the smartest way to monitor your LLM applications.
          </h1>
          <p className="text-lg sm:text-2xl text-gray-600 sm:leading-relaxed max-w-3xl">
            Meet your all-in-one platform for AI observability. Get monitoring,
            logging, and tracing for your LLM applications out of the box.
          </p>

          <div className="flex flex-row gap-8 pt-8">
            <button className="bg-gray-900 hover:bg-gray-700 whitespace-nowrap rounded-2xl px-6 py-3 text-lg font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
              Get Started
            </button>
            {/* <button className="bg-gray-100 hover:bg-gray-200 whitespace-nowrap border border-gray-900 rounded-2xl px-6 py-3 text-lg font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
              View Demo
            </button> */}
          </div>

          <a
            href="https://www.ycombinator.com/launches/I73-helicone-open-source-observability-platform-for-generative-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex space-x-6 font-semibold text-gray-600 pt-4"
          >
            Backed by{" "}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 ml-2"
            >
              <g clip-path="url(#clip0_24_57)">
                <rect width="24" height="24" rx="5.4" fill="#FF5100"></rect>
                <rect
                  x="0.5"
                  y="0.5"
                  width="23"
                  height="23"
                  rx="4.9"
                  stroke="#FF844B"
                ></rect>
                <path
                  d="M7.54102 7.31818H9.28604L11.9458 11.9467H12.0552L14.715 7.31818H16.46L12.7662 13.5028V17.5H11.2349V13.5028L7.54102 7.31818Z"
                  fill="white"
                ></path>
              </g>
              <rect
                x="0.5"
                y="0.5"
                width="23"
                height="23"
                rx="4.9"
                stroke="#FF5100"
                stroke-opacity="0.1"
              ></rect>
              <rect
                x="0.5"
                y="0.5"
                width="23"
                height="23"
                rx="4.9"
                stroke="url(#paint0_radial_24_57)"
              ></rect>
              <defs>
                <radialGradient
                  id="paint0_radial_24_57"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(7.35) rotate(58.475) scale(34.1384)"
                >
                  <stop stop-color="white" stop-opacity="0.56"></stop>
                  <stop
                    offset="0.28125"
                    stop-color="white"
                    stop-opacity="0"
                  ></stop>
                </radialGradient>
                <clipPath id="clip0_24_57">
                  <rect width="24" height="24" rx="5.4" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>{" "}
            Combinator
          </a>
          <div className="flex flex-col pt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-2.5 lg:rounded-2xl lg:p-2.5">
              <img
                src="/assets/landing/preview.webp"
                alt="App screenshot"
                width={2720}
                height={1844}
                className="w-[70rem] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
          <div className="mx-auto px-6 lg:px-8 pt-32">
            <h2 className="text-center text-lg font-medium text-gray-600">
              Unlocking the full potential of LLM's.
            </h2>
            <h2 className="text-center text-lg font-medium text-gray-900">
              Modern startups and enterprises use Helicone.
            </h2>
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:gap-x-10 lg:mx-0 lg:max-w-none">
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
                alt="Transistor"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
                alt="Reform"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
                alt="Tuple"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
                alt="SavvyCal"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                alt="Statamic"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                alt="Statamic"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                alt="Statamic"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                alt="Statamic"
                width={158}
                height={48}
              />
            </div>
          </div>
        </div>
      </div>
      <section
        id="features"
        className="bg-gradient-to-b from-white to-gray-200 h-screen mt-24 antialiased"
      >
        <div className="md:px-8 max-w-6xl justify-center items-center text-center flex flex-col mx-auto w-full space-y-12">
          <div className="flex flex-col space-y-4 w-full">
            <h2 className="text-5xl font-semibold">
              Two lines of code. That's it.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-normal">
              Helicone makes it easy to understand what your AI is doing and
              speeds up your development process - with the easiest integration
              in the market.
            </p>
            <div className="flex flex-row w-full justify-between gap-4">
              <div className="text-left w-full">
                <DiffHighlight
                  code={`
import { Configuration, OpenAIApi } from "openai";
                
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    // Add a basePath to the Configuration
    basePath: "${BASE_PATH}",
    baseOptions: {
        headers: {
            // Add your Helicone API Key
            "Helicone-Auth": "Bearer <YOUR_API_KEY>",
        },
    }
});
                
const openai = new OpenAIApi(configuration);`}
                  language="bash"
                  newLines={[5, 9]}
                  oldLines={[]}
                />
              </div>
              <div className="bg-red-500 w-full h-48"></div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="bg-gray-200 h-screen pt-24 antialiased">
        <div className="md:px-8 max-w-6xl justify-center items-center text-center flex flex-col mx-auto w-full space-y-12">
          <div className="flex flex-col space-y-4">
            <h2 className="text-5xl font-semibold">
              Purpose-built for LLM developers.
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to build, deploy, and scale your LLM-powered
              application
            </p>
          </div>

          <ul className="flex flex-row gap-12 justify-center">
            {features.map((f) => (
              <li className="flex flex-col gap-4 justify-start items-center">
                <div className="h-12 w-12 border border-gray-300 shadow-sm rounded-lg flex justify-center items-center">
                  <f.icon className="h-4 w-4 text-gray-900" />
                </div>
                <p className="text-gray-700 text-sm max-w-[5rem] text-center">
                  {f.title}
                </p>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-4 h-[50vh] w-full">
            <div className="col-span-1 h-full border border-gray-200 bg-white rounded-xl flex flex-col justify-center items-center">
              x1
            </div>
            <div className="relative isolate bg-gray-100 rounded-xl">
              <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-gray-200"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={25}
                    height={25}
                    x="50%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M25 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                />
              </svg>
              <div className="col-span-1 h-full border border-gray-200 rounded-xl flex flex-col justify-center items-center">
                x
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
    </div>
  );
}
