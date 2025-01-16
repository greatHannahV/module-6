import {
  TableBodyItems,
  TableNameAndSymbol,
  ShortNameStyle,
  MarketChange,
  SymbolStyle,
} from "./WatchlistContentTableRow.styles.";

type TableRowProps = {
  stock: {
    shortName: string;
    symbol: string;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketPrice?: number;
    currency: string;
  };
};

function WatchlistContentTableRow({ stock }: TableRowProps) {
  const $isNegative =
    stock.regularMarketChange < 0 || stock.regularMarketChangePercent < 0;

  return (
    <TableBodyItems to={`/chart/${stock.symbol}`}>
      <TableNameAndSymbol>
        <ShortNameStyle>{stock.shortName}</ShortNameStyle>
        <SymbolStyle>{stock.symbol}</SymbolStyle>
      </TableNameAndSymbol>
      <MarketChange $isNegative={$isNegative} data-testid="test-cell">
        {stock.currency === "USD" ? "$" : stock.currency}
        {stock.regularMarketPrice ? stock.regularMarketPrice.toFixed(2) : "N/A"}
      </MarketChange>
      <MarketChange $isNegative={$isNegative}>
        {stock.regularMarketChange.toFixed(2)}
      </MarketChange>
    </TableBodyItems>
  );
}

export default WatchlistContentTableRow;
