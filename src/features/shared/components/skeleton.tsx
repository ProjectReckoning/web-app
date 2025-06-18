import { Skeleton as SkeletonMui, SkeletonProps } from "@mui/material";

export default function Skeleton(props: SkeletonProps) {
  return (
    <SkeletonMui
      animation="wave"
      {...props}
    />
  );
}