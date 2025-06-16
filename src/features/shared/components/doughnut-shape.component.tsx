import { Box, BoxProps } from "@mui/material";

interface DoughnutShapeProps extends Omit<BoxProps, 'width' | 'height' | 'innerRatio'> {
  width?: number;
  height?: number;
  innerRatio?: number;
  innerColor?: string;
}

export default function DoughnutShape({
  width = 600,
  height = 600,
  innerRatio = 0.4,
  innerColor = 'transparent',
  ...props
}: DoughnutShapeProps) {
  return (
    <Box
      borderRadius= '50%'
      width={width}
      height={height}
      {...props}
    >
      <Box
        sx={{
          width: width * innerRatio,
          height: height * innerRatio,
          borderRadius: '50%',
          backgroundColor: innerColor,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </Box>
  );
}