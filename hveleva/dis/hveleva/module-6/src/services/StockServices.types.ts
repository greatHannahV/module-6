export interface PriceChangeRateParams {
  regularMarketPrice?: number;
  previousClose?: number;
}
export interface Meta extends PriceChangeRateParams {
  shortName: string;
  regularMarketTime?: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketPreviousClose?: number;
  symbol: string;
  currency: string;
  exchangeName: string;
  fullExchangeName: string;
  instrumentType: string;
  selected?: boolean;
  [key: string]: string | number | undefined | boolean;
}

interface QuoteResponse {
  result?: Meta[];
}

interface StockDetailsResponse {
  quoteResponse?: QuoteResponse;
}

export function isStockDetailsResponse(
  data: unknown
): data is StockDetailsResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "quoteResponse" in data &&
    typeof (data as StockDetailsResponse).quoteResponse === "object"
  );
}
export interface StockSuggestion {
  symbol: string;
  name: string;
  exch: string;
  exchDisp: string;
  type: string;
  typeDisp: string;
}

export interface ResultSet {
  Query: string;
  Result: StockSuggestion[];
}
export interface ApiResponse {
  ResultSet: ResultSet;
}
