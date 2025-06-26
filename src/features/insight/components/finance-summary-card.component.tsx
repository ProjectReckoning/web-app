'use client';

import Skeleton from '@/features/shared/components/skeleton';
import { Box, BoxProps, Typography } from '@mui/material';
import React from 'react';

export interface FinanceSummaryItem {
  title: string;
  amount: string;
  color?: string;
}

interface FinanceSummaryCardProps {
  items: FinanceSummaryItem[];
  isLoading?: boolean;
}

const DEFAULT_ITEM_COUNT = 4;

export default function FinanceSummaryCard({
  items,
  isLoading = false,
  ...props
}: FinanceSummaryCardProps & BoxProps) {
  if (isLoading) {
    return (
      <Box
        display="grid"
        gap={2}
        gridTemplateColumns={{
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        {...props}>
        {Array.from({ length: DEFAULT_ITEM_COUNT }).map((_, index) => (
          <Box
            key={index}
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            px={2}
            py={3}
            sx={{
              backgroundColor: "limeGreen.main"
            }}
          >
            <Typography variant='body1' textAlign="center" whiteSpace="nowrap">
              <Skeleton width="60%" sx={{ mx: "auto" }} />
            </Typography>
            <Typography variant='h6' fontWeight="bold" textAlign="center" whiteSpace="nowrap">
              <Skeleton width="60%" sx={{ mx: "auto" }} />
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box
      display="grid"
      gap={2}
      gridTemplateColumns={{
        xs: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(4, 1fr)',
      }}
      {...props}>

      {items.map((item) => (
        <Box
          key={item.title + item.amount}
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          px={2}
          py={3}
          sx={{
            backgroundColor: "limeGreen.main"
          }}
        >
          <Typography variant='body1' textAlign="center" whiteSpace="nowrap">
            {item.title}
          </Typography>
          <Typography variant='h6' fontWeight="bold" textAlign="center" whiteSpace="nowrap" color={item.color ?? "inherit"}>
            {item.amount}
          </Typography>
        </Box>
      ))}
    </Box>

  );
}
