import { expect, it, describe, beforeAll, afterEach, afterAll } from "vitest";
import { fetchStockDetails, fetchStockTicker } from "./StockServices";
import "@testing-library/jest-dom";
import { server } from "./__mock__/browser";
import { http, HttpResponse } from "msw";

describe("Test API calls using MSW", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should fetch trending symbols", async () => {
    const response = await fetchStockTicker("AAPL");

    expect(response).toBeDefined();
    expect(response?.processedData.length).toBeGreaterThan(0);
    expect(response?.chartData.meta.symbol).toBe("AAPL");
  });

  it("should fetch stock details for the ticker", async () => {
    const stockDetails = await fetchStockDetails(["APPL"]);

    expect(stockDetails).toBeDefined();
    expect(stockDetails[0]?.symbol).toBe("APPL");
  });

  it("should handle Unauthorized (401) error", async () => {
    http.get("https://yfapi.net/v6/finance/quote?symbols=appl", () => {
      return HttpResponse.json(
        { message: "Request failed with status code 401" },
        { status: 401 }
      );
    });

    await expect(fetchStockDetails(["ABC"])).rejects.toThrowError(
      "Request failed with status code 401"
    );
  });

  it("should handle 'Request failed with status code 404' error", async () => {
    http.get("https://yfapi.net/v6/finance/quote?symbols=appl", () => {
      return HttpResponse.json(
        { message: "Request failed with status code 404" },
        { status: 404 }
      );
    });

    await expect(fetchStockDetails(["CDF"])).rejects.toThrowError(
      "Request failed with status code 404"
    );
  });

  it("should handle 'Request failed with status code 400' error", async () => {
    http.get("https://yfapi.net/v6/finance/quote?symbols=appl", () => {
      return HttpResponse.json(
        { message: "Request failed with status code 400" },
        { status: 400 }
      );
    });

    await expect(fetchStockDetails(["APDF"])).rejects.toThrowError(
      "Request failed with status code 400"
    );
  });

  it("should handle server error (500)", async () => {
    http.get("https://yfapi.net/v6/finance/quote?symbols=appl", () => {
      return HttpResponse.json(
        { message: "Request failed with status code 500" },
        { status: 500 }
      );
    });

    await expect(fetchStockDetails(["LLKS"])).rejects.toThrowError(
      "Request failed with status code 500"
    );
  });
});
