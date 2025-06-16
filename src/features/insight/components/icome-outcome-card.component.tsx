'use client';

import { Box, Typography, BoxProps } from '@mui/material';
import formatCurrency from '@/lib/format-currency';
import { Icon } from '@iconify/react';

interface IncomeOutcomeCardProps extends BoxProps {
  income: number;
  expense: number;
}

export default function IncomeOutcomeCard({ income, expense, ...props }: IncomeOutcomeCardProps) {
  return (
    <Box
      borderRadius={4}
      padding={2}
      border={1}
      borderColor="border.main"
      {...props}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Icon icon="lets-icons:in" style={{ fontSize: 20, color: 'black' }} />
        <Typography fontWeight="bold">Pemasukan</Typography>
      </Box>

      <Typography fontSize={24} fontWeight="bold" color="mediumseagreen">
        {formatCurrency(income)}
      </Typography>

      <Box my={1} sx={{ borderBottom: '1px solid #ccc' }} />

      <Box display="flex" alignItems="center" gap={1}>
        <Icon icon="lets-icons:out" style={{ fontSize: 20, color: 'black' }} />
        <Typography fontWeight="bold">Pengeluaran</Typography>
      </Box>

      <Typography fontSize={24} fontWeight="bold" color="indianred">
        {formatCurrency(expense)}
      </Typography>
    </Box>
  );
}