'use client';

import DoughnutShape from '@/features/shared/components/doughnut-shape';
import { Box, Typography, BoxProps } from '@mui/material';
import ScheduledTransactionItem, { ScheduledTransactionItemProps } from './scheduled-transactions-item';

interface ScheduledTransactionListProps extends BoxProps {
  title: string;
  transactions: ScheduledTransactionItemProps[];
}

export default function ScheduledTransactionList({
  title,
  transactions,
  ...props
}: ScheduledTransactionListProps) {
  return (
    <Box
      position="relative"
      overflow="hidden"
      borderRadius={5}
      padding={4}
      border={1}
      borderColor="border.main"
      {...props}
    >
      <DoughnutShape
        width={600}
        height={600}
        innerRatio={0.5}
        innerColor='white'
        sx={{
          position: 'absolute',
          top: -300,
          right: -400,
          backgroundColor: 'purple.light',
        }} />

      <Typography position="relative" zIndex={20} fontSize={20} fontWeight="bold" mb={2}>
        {title}
      </Typography>

      <Box position="relative" zIndex={20} display="flex" gap={2} overflow="auto">
        {transactions.map((item, index) => (
          <ScheduledTransactionItem key={index} {...item} />
        ))}
      </Box>
    </Box>
  );
}