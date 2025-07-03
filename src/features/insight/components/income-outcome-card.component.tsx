'use client';

import { Box, Typography, BoxProps } from '@mui/material';
import formatCurrency from '@/lib/format-currency';
import { Icon } from '@iconify/react';
import Skeleton from '@/features/shared/components/skeleton';

interface IncomeOutcomeCardProps extends BoxProps {
  income: number;
  expense: number;
  isLoading?: boolean;
}

export default function IncomeOutcomeCard({ income, expense, isLoading = false, ...props }: IncomeOutcomeCardProps) {
  if (isLoading) {
    return (
      <Box
        borderRadius={4}
        padding={2}
        border={1}
        borderColor="border.main"
        {...props}
      >
        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width={100} height={20} />
        </Box>

        <Skeleton variant="text" width={140} height={32} />

        <Box my={1} sx={{ borderBottom: '1px solid #ccc' }} />

        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width={100} height={20} />
        </Box>

        <Skeleton variant="text" width={140} height={32} />
      </Box>
    );
  }
  return (
    <Box
      borderRadius={4}
      padding={2}
      border={1}
      borderColor="border.main"
      {...props}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Icon icon="lets-icons:in" style={{ fontSize: 20 }} />
        <Typography>Pemasukan</Typography>
      </Box>

      <Typography fontSize={24} fontWeight={600} color="mediumseagreen">
        {formatCurrency(income)}
      </Typography>

      <Box my={1} sx={{ borderBottom: '1px solid #ccc' }} />

      <Box display="flex" alignItems="center" gap={1}>
        <Icon icon="lets-icons:out" style={{ fontSize: 20 }} />
        <Typography>Pengeluaran</Typography>
      </Box>

      <Typography fontSize={24} fontWeight={600} color="indianred">
        {formatCurrency(expense)}
      </Typography>
    </Box>
  );
}