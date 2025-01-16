import { Meta } from "../../services/StockServices.types";

export interface TableProps {
  stocks: Meta[];
  isLoading: boolean;
  children?: React.ReactNode;
}
export type TableHeaderProps = {
  tableHeaders: {
    shortName: string;
    regularMarketPreviousClose: string;
    regularMarketPrice: string;
    regularMarketChangePercent: string;
    regularMarketChange: string;
    regularMarketTime: string;
    symbol: string;
  };
};
