import { memo } from "react";
import Navigation from "../../components/Navigation/Navigation";
import WatchlistContent from "../../components/WatchlistContent/WatchlistContent";

function Watchlist() {
  return (
    <>
      <Navigation />
      <WatchlistContent />
    </>
  );
}

export default memo(Watchlist);
