import { http, HttpHandler, HttpResponse } from "msw";
import TRENDING_US from "./v1_trending_us.json";
import QUOTES from "./v6_quote.json";
import QUOTE from "./v8_quote.json";

const basePath: string = "https://yfapi.net";

export const handlers: HttpHandler[] = [
  http.get(`${basePath}/v1/finance/trending/US`, () => {
    return HttpResponse.json(TRENDING_US, { status: 200 });
  }),

  http.get(`${basePath}/v6/finance/quote`, ({ request }) => {
    const queryParams = new URL(request.url).searchParams;
    const symbol = queryParams.get("symbols");

    switch (symbol) {
      case "ABC":
        return HttpResponse.json("Request failed with status code 401", {
          status: 401,
        });

      case "CDF":
        return HttpResponse.json("Request failed with status code 404", {
          status: 404,
        });

      case "APDF":
        return HttpResponse.json("Request failed with status code 400", {
          status: 400,
        });

      case "LLKS":
        return HttpResponse.json("Request failed with status code 500", {
          status: 500,
        });

      default:
        return HttpResponse.json(QUOTES, { status: 200 });
    }
  }),

  http.get(`${basePath}/v8/finance/chart/:symbol`, (req) => {
    const symbol = req.params.symbol;

    switch (symbol) {
      case "NOTFOUND":
        return HttpResponse.json(
          {
            chart: {
              result: null,
              error: {
                code: "Not Found",
                description: "No data found, symbol may be delisted",
              },
            },
          },
          { status: 200 } // API returns 200 status code when symbol not found
        );

      case "FORBIDDEN":
        return HttpResponse.json(
          {
            message: "Forbidden",
            hint: "Sign up for API key https://financeapi.net/tutorial",
          },
          { status: 403 }
        );

      default:
        return HttpResponse.json(QUOTE, { status: 200 });
    }
  }),
];
