'use client';

import DoughnutShape from '@/features/shared/components/doughnut-shape.component';
import { Box, Typography, BoxProps, Avatar } from '@mui/material';
import ScheduledTransactionItem, { ScheduledTransactionItemProps } from './scheduled-transactions-item.component';
import Skeleton from '@/features/shared/components/skeleton';
import { Icon } from '@iconify/react';

interface ScheduledTransactionListProps extends BoxProps {
  title: string;
  transactions: ScheduledTransactionItemProps[];
  isLoading?: boolean;
}

const DEFAULT_COUNT = 3

export default function ScheduledTransactionList({
  title,
  transactions,
  isLoading = false,
  ...props
}: Readonly<ScheduledTransactionListProps>) {
  if (isLoading) {
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

        <Typography
          position="relative"
          zIndex={20}
          fontSize={20}
          fontWeight="bold"
          mb={2}
        >
          {title}
        </Typography>

        <Box
          position="relative"
          zIndex={20}
          display="flex"
          gap={2}
          overflow="auto"
        >
          {Array.from({ length: DEFAULT_COUNT }).map((_, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                borderRadius: 4,
                overflow: 'hidden',
                minWidth: 240,
                border: 1,
                borderColor: "border.main",
                mb: 2,
                backgroundColor: "white",
              }}>
              <Box
                sx={{
                  bgcolor: 'transparent',
                  textAlign: 'center',
                  p: 1.5,
                  px: 2,
                  borderRight: 1,
                  borderColor: 'border.main',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Skeleton variant="text" width={40} height={20} />
                <Skeleton variant="text" width={30} height={28} />
              </Box>

              <Box
                sx={{
                  p: 1.5,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Skeleton variant="text" width={128} height={18} />
                <Skeleton variant="text" width="60%" height={24} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box >
    )
  }

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

      {!isLoading && !transactions.length && (
        <Box position="relative" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Avatar sx={{ bgcolor: 'purple.main', width: 48, height: 48, mt: 1 }}>
            <Icon icon="mdi:calendar-clock-outline" width={32} />
          </Avatar>
          <Typography variant="body1" mt={2} color='gray.main'>
            Belum ada transaksi terjadwal
          </Typography>
        </Box>
      )}

      <Box position="relative" zIndex={20} display="flex" gap={2} overflow="auto">
        {transactions?.map((item) => (
          <ScheduledTransactionItem key={`${item.day}-${item.date}-${item.amount}`} {...item} />
        ))}
      </Box>
    </Box>
  );
}