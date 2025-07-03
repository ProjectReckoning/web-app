import { Card, CardContent, Box, Typography, Skeleton } from "@mui/material";

export default function PocketOverviewCardSkeleton() {
  return (
    <Card sx={{ minWidth: 275, borderRadius: 8 }} variant="outlined">
      <CardContent sx={{ padding: 0 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            backgroundColor: 'grey.100',
          }}
        >
          <Skeleton
            variant="circular"
            width={48}
            height={48}
            sx={{ bgcolor: 'grey.300' }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, marginTop: 2 }}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="20%" />
            <Skeleton variant="text" width="80%" />
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            px: 2,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" color="green.main">
              <Skeleton variant="text" width={80} height={24} />
            </Typography>
            <Skeleton variant="text" width={100} height={32} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" color="red.main">
              <Skeleton variant="text" width={80} height={24} />
            </Typography>
            <Skeleton variant="text" width={100} height={32} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}