import { describe, it } from "vitest";
import { Meta } from "../services/StockServices.types";
import { updateMainTable } from "./updateMainTable";

describe("updateMainTable", () => {
  const tableHeaders: Record<string, string> = {
    symbol: "Symbol",
    shortName: "Short Name",
    regularMarketChange: "Change",
    regularMarketChangePercent: "Change Percent",
  };

  const mockStockData: Meta[] = [
    {
      symbol: "AAPL",
      shortName: "Apple Inc.",
      regularMarketChange: 1.23,
      regularMarketChangePercent: 2.34,
    },
    {
      symbol: "MSFT",
      shortName: "Microsoft Corp.",
      regularMarketChange: -0.45,
      regularMarketChangePercent: -0.56,
    },
  ];

  it("should return the formatted table data with specified headers", () => {
    const result = updateMainTable(mockStockData, tableHeaders);
    const expectedData = [
      {
        symbol: "AAPL",
        shortName: "Apple Inc.",
        regularMarketChange: 1.23,
        regularMarketChangePercent: 2.34,
      },
      {
        symbol: "MSFT",
        shortName: "Microsoft Corp.",
        regularMarketChange: -0.45,
        regularMarketChangePercent: -0.56,
      },
    ];

    expect(result).toHaveLength(expectedData.length);
    result.forEach((item, index) => {
      expect(item).toEqual(expectedData[index]);
    });
  });

  it("should handle an empty stock data array", () => {
    const result = updateMainTable([], tableHeaders);

    expect(result).toHaveLength(0);
  });

  it("should return data with only specified headers", () => {
    const partialHeaders: Record<string, string> = {
      symbol: "Symbol",
      shortName: "Short Name",
    };

    const result = updateMainTable(mockStockData, partialHeaders);
    const expectedData = [
      {
        symbol: "AAPL",
        shortName: "Apple Inc.",
        regularMarketChange: 1.23,
        regularMarketChangePercent: 2.34,
      },
      {
        symbol: "MSFT",
        shortName: "Microsoft Corp.",
        regularMarketChange: -0.45,
        regularMarketChangePercent: -0.56,
      },
    ];

    expect(result).toHaveLength(expectedData.length);
    result.forEach((item, index) => {
      expect(item).toEqual(expectedData[index]);
    });
  });

  it("should handle non-existent headers gracefully", () => {
    const invalidHeaders: Record<string, string> = {
      nonExistentField: "Non Existent Field",
    };

    const result = updateMainTable(mockStockData, invalidHeaders);

    expect(result).toHaveLength(mockStockData.length);
    result.forEach((item, index) => {
      expect(item).toEqual(mockStockData[index]);
    });
  });

  it("should handle mixed valid and invalid headers", () => {
    const mixedHeaders: Record<string, string> = {
      symbol: "Symbol",
      nonExistentField: "Non Existent Field",
    };

    const result = updateMainTable(mockStockData, mixedHeaders);
    const expectedData = [
      {
        symbol: "AAPL",
      },
      {
        symbol: "MSFT",
      },
    ];

    expect(result).toHaveLength(expectedData.length);
    result.forEach((item, index) => {
      expect(item.symbol).toEqual(expectedData[index].symbol);
      expect(item).not.toHaveProperty("nonExistentField");
    });
  });
});
