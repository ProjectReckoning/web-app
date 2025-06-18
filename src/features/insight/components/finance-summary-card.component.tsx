'use client';

import { Box, BoxProps, Divider, Typography } from '@mui/material';
import React from 'react';

export interface FinanceSummaryItem {
  title: string;
  amount: string;
}

interface FinanceSummaryCardProps {
  items: FinanceSummaryItem[];
  backgroundColor?: string;
  borderRadius?: number | string;
  gap?: number;
}

export default function FinanceSummaryCard({
  items,
  ...props
}: FinanceSummaryCardProps & BoxProps) {
  return (
    <Box display="flex" alignItems="stretch" {...props}>
  {items.map((item, index) => (
    <React.Fragment key={index}>
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        px={2}
        py={3}
      >
        <Typography variant='body1' textAlign="center">
          {item.title}
        </Typography>
        <Typography variant='h6' fontWeight="bold" textAlign="center">
          {item.amount}
        </Typography>
      </Box>

      {index < items.length - 1 && (
        <Divider
          orientation="vertical"
          flexItem
          sx={{ backgroundColor: 'white', mx: 1, width: 8 }}
        />
      )}
    </React.Fragment>
  ))}
</Box>

  );
}
