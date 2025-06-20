'use client';

import { Box, Typography, Avatar, Stack, Button, BoxProps } from '@mui/material';
import { Icon } from '@iconify/react';
import DoughnutShape from '@/features/shared/components/doughnut-shape.component';
import { purple } from '@/lib/custom-color';
import Skeleton from '@/features/shared/components/skeleton';

export interface Contributor {
  name: string;
  percentage: string;
  amount: string;
}

interface TopContributorsCardProps {
  title?: string;
  contributors: Contributor[];
  isLoading?: boolean;
  onSeeAll?: () => void;
}

const DEFAULT_COUNT = 3;

export default function TopContributorsCard({
  title = 'Kontribusi Terbesar',
  contributors,
  isLoading = false,
  onSeeAll,
  ...props
}: TopContributorsCardProps & BoxProps) {
  return (
    <Box
      borderRadius={4}
      border={1}
      borderColor={"border.main"}
      overflow="hidden"
      position="relative"
      padding={3}
      sx={{
        bgcolor: 'white',
      }}
      {...props}
    >
      <DoughnutShape
        width={600}
        height={600}
        innerRatio={0.5}
        innerColor="white"
        sx={{
          backgroundColor: purple[100],
          position: 'absolute',
          top: -300,
          left: -400,
        }}
      />

      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" position="relative" zIndex={1} mb={2}>
        <Typography fontWeight="bold" fontSize="1.2rem">
          {title}
        </Typography>
        {onSeeAll && (
          <Button
            onClick={onSeeAll}
            sx={{ color: 'orange.main', fontWeight: 600, p: 0, textDecoration: 'underline' }}
            disableRipple
          >
            Lihat semua
          </Button>
        )}
      </Box>

      <Stack spacing={2} position="relative" zIndex={1}>
        {isLoading ? Array.from({ length: DEFAULT_COUNT }).map((_, idx) => (
          <Box key={idx} display="flex" gap={2} justifyContent="space-between" mb={1}>
            <Box sx={{
              display: {
                xs: 'none',
                sm: 'flex',
              }
            }}>
              <Skeleton variant="circular" width={40} height={40} />
            </Box>

            <Box flex={1} display="flex" flexWrap="wrap" alignItems="center" rowGap={1}>
              <Skeleton width={120} height={20} sx={{ flex: 1, minWidth: 100 }} />

              <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} overflow="hidden">
                <Skeleton
                  width={60}
                  height={30}
                  variant="rectangular"
                  sx={{ borderRadius: '16px 0 0 16px' }}
                />
                <Skeleton width={50} height={20} />
              </Box>
            </Box>
          </Box>
        )) : contributors.map((contributor) => (
          <Box key={`${contributor.name}-${contributor.amount}`} display="flex" gap={2} justifyContent="space-between">
            <Avatar sx={{
              bgcolor: 'tosca.main', color: 'black', display: {
                xs: 'none',
                sm: 'flex',
              }
            }}>
              <Icon icon="mdi:crown" width={24} />
            </Avatar>

            <Box flex={1} display="flex" flexWrap="wrap" alignItems="center" rowGap={1}>
              <Typography flex={1} minWidth={100} fontWeight="600">{contributor.name}</Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} overflow="hidden">
                <Typography fontWeight={500} textAlign="right" sx={{ backgroundColor: "tosca.light", p: 1, pl: 2, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }}>
                  {contributor.percentage}
                </Typography>
                <Typography fontWeight={500} textAlign="right">
                  {contributor.amount}
                </Typography>
              </Box>
            </Box>

          </Box>
        ))}

        {contributors.length === 0 && !isLoading && (
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Avatar sx={{ bgcolor: 'purple.main', width: 48, height: 48, mt: 1 }}>
              <Icon icon="mdi:account-multiple-outline" width={32} />
            </Avatar>
            <Typography variant="body1" mt={2} color='gray.main'>
              Belum ada kontribusi
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
