'use client';

import { Box, Typography, BoxProps } from '@mui/material';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import formatCurrency from '@/lib/format-currency';

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
        <SouthWestIcon sx={{ color: 'black', fontSize: 20 }} />
        <Typography fontWeight="bold">Pemasukan</Typography>
      </Box>

      <Typography fontSize={24} fontWeight="bold" color="mediumseagreen">
        {formatCurrency(income)}
      </Typography>

      <Box my={1} sx={{ borderBottom: '1px solid #ccc' }} />

      <Box display="flex" alignItems="center" gap={1}>
        <NorthEastIcon sx={{ color: 'black', fontSize: 20 }} />
        <Typography fontWeight="bold">Pengeluaran</Typography>
      </Box>

      <Typography fontSize={24} fontWeight="bold" color="indianred">
        {formatCurrency(expense)}
      </Typography>
    </Box>
  );
}