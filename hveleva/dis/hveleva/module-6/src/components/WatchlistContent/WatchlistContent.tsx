import { useAppContext } from "../../AppContext";

import {
  WatchlistContentStyle,
  WatchlistHeader,
} from "./WatchlistContent.styles";
import SkeletonWatchlist from "../skeletons/SkeletonWatchlist/SkeletonWatchlist";
import { memo } from "react";
import WatchlistContentBody from "../WatchlistContentBody/WatchlistContentBody";
import WatchlistContentHeader from "../WatchlistContentHeader/WatchlistContentHeader";

function WatchlistContent() {
  const { isLoading } = useAppContext();

  const { bookedStocks } = useAppContext();

  if (isLoading) {
    return <SkeletonWatchlist />;
  }

  return (
    <WatchlistContentStyle>
      <WatchlistHeader>
        Equity Watchlist ({bookedStocks.length})
      </WatchlistHeader>
      <WatchlistContentHeader />
      <WatchlistContentBody />
    </WatchlistContentStyle>
  );
}

export default memo(WatchlistContent);
