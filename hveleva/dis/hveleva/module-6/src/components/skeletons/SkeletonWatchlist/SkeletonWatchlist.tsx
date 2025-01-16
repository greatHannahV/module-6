import Shimmer from "../Shimmer/Shimmer";
import SkeletonElement from "../SkeletonElement/SkeletonElement";
import { ShimmerWrapperStyled } from "../SkeletonTable/SkeletonTable.styles";
import {
  SkeletonWatchlistContainerStyled,
  WatchlistList,
} from "./SkeletonWatchlist.styles";

function SkeletonWatchlist() {
  return (
    <SkeletonWatchlistContainerStyled data-testid="watchlist-charts">
      <SkeletonElement $type="watchlist-header" />
      <WatchlistList>
        <SkeletonElement $type="watchlist-title" />
        <SkeletonElement $type="watchlist-title" />
        <SkeletonElement $type="watchlist-title" />
        <SkeletonElement $type="watchlist-title" />
        <SkeletonElement $type="watchlist-title" />
        <SkeletonElement $type="watchlist-title" />
        <SkeletonElement $type="watchlist-title" />
      </WatchlistList>

      <ShimmerWrapperStyled>
        <Shimmer />
      </ShimmerWrapperStyled>
    </SkeletonWatchlistContainerStyled>
  );
}

export default SkeletonWatchlist;
