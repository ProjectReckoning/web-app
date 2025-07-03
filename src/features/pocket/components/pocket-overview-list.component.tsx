import { Box, BoxProps } from "@mui/material";
import PocketOverviewCardSkeleton from "./pocket-overview-card-skeleton.component";
import PocketOverviewCard from "./pocket-overview-card.component";
import { PocketEntity } from "../entities/pocket.entites";

export default function PocketOverviewList({
  isLoading = true,
  pockets = [],
  ...props
}: Omit<BoxProps, 'children'> & {
  isLoading?: boolean;
  pockets?: PocketEntity[];
}) {
  if (isLoading && pockets.length === 0) {
    return (
      <Box {...props} display="flex">
        {Array.from({ length: 4 }).map((_, index) => (
          <PocketOverviewCardSkeleton key={index} />
        ))}
      </Box>
    );
  }

  return (
    <Box {...props} display="flex">
      {pockets.map((pocket) => (
        <PocketOverviewCard key={pocket.id} pocket={pocket} />
      ))}
    </Box>
  );
}