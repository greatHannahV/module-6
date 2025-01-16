import styled, { css } from "styled-components";
import { SkeletonElementProps } from "./SkeletonElement.types";

const TextSkeleton = css`
  width: 100%;
  height: 20px;
`;
const TextChartSkeleton = css`
  width: 60%;
  height: 100px;
`;
const HeaderSkeleton = css`
  width: 70%;
  height: 35px;
`;
const TitleSkeleton = css`
  width: 50%;
  height: 30px;
`;
const ChartsBodySkeleton = css`
  width: 100%;
  height: 1000px;
`;

const WatchlistSkeleton = css`
  width: 50%;
  height: 60px;
  margin: 5px auto;
`;
const WatchlistHeader = css`
  width: 50%;
  height: 50px;
  margin: 0 auto;
`;
const SKELETON_TYPE_MAP = {
  text: TextSkeleton,
  "text-chart": TextChartSkeleton,
  header: HeaderSkeleton,
  title: TitleSkeleton,
  "charts-body": ChartsBodySkeleton,
  "watchlist-title": WatchlistSkeleton,
  "watchlist-header": WatchlistHeader,
};
export { SKELETON_TYPE_MAP };

const Skeleton = styled.div<SkeletonElementProps>`
  background: #ddd;
  margin: 10px 0;
  border-radius: 4px;

  ${({ $type }) => SKELETON_TYPE_MAP[$type]};
`;

export default Skeleton;
