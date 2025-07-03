import { Box } from "@mui/material";

export default function Loading() {
  return (
    <Box
      component="img"
      src="/images/loading-icon.png"
      alt="Logo"
      width={200}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'flip 1s cubic-bezier(0.5, 0, 0.25, 1) infinite forwards',
        '@keyframes flip': {
          '0%': { transform: 'translate(-50%, -50%) scaleX(1)' },
          '100%': { transform: 'translate(-50%, -50%) scaleX(-1)' },
        },
      }}
    />
  )
}