'use client';

import { Box, Typography, Avatar, Stack, Button, BoxProps } from '@mui/material';
import { Icon } from '@iconify/react';
import DoughnutShape from '@/features/shared/components/doughnut-shape.component';
import { purple } from '@/lib/custom-color';

export interface Contributor {
  name: string;
  percentage: string;
  amount: string;
}

interface TopContributorsCardProps {
  title?: string;
  contributors: Contributor[];
  onSeeAll?: () => void;
}

export default function TopContributorsCard({
  title = 'Kontribusi Terbesar',
  contributors,
  onSeeAll,
  ...props
}: TopContributorsCardProps & BoxProps) {
  return (
    <Box
      sx={{
        borderRadius: 4,
        bgcolor: 'white',
        p: 3,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 1,
        minWidth: 240,
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
        {contributors.map((contributor) => (
          <Box key={`${contributor.name}-${contributor.amount}`} display="flex" gap={2} justifyContent="space-between">
            <Avatar sx={{ bgcolor: 'tosca.main', color: 'black', display: {
              xs: 'none',
              sm: 'flex',
            } }}>
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
      </Stack>
    </Box>
  );
}
