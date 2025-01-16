import { SkeletonTablesContainerStyled } from "./SkeletonBiggestTables.styles.ts";
import Shimmer from "../Shimmer/Shimmer.tsx";
import SkeletonBiggestContent from "../SkeletonBiggestContent/SkeletonBiggestContent.tsx";
import { FC, memo } from "react";

const SkeletonBiggestTables: FC = () => {
  return (
    <SkeletonTablesContainerStyled>
      <SkeletonBiggestContent />
      <Shimmer />
    </SkeletonTablesContainerStyled>
  );
};

export default memo(SkeletonBiggestTables);
