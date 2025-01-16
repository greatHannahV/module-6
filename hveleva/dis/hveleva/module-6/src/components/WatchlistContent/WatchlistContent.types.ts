export type TableHeaders = {
  shortName: string;
  regularMarketChange: string;
  regularMarketPrice: string | undefined;
};
export type WatchlistHeaderProps = {
  tableHeaders: TableHeaders;
};
export type WatchlistCellStyledProps = {
  $last: boolean;
  $first: boolean;
  $bold: boolean;
  $textColor?: string;
};
