'use client';

import { Box, Typography, Avatar, BoxProps, } from '@mui/material';
import formatCurrency from '@/lib/format-currency';
import { gray, green } from '@/lib/custom-color';
import { TransactionSummaryEntity } from '../entities/transaction-summary.entities';
import Skeleton from '@/features/shared/components/skeleton';
import CustomIcon from '@/features/shared/components/custom-icon.component';
import { getLabelFromTransactionType } from '@/lib/get-label-from-transaction-type';

const DEFAULT_COUNT = 5;

export default function TransactionOverviewCard({
  transactions,
  isLoading = false,
  actions,
  ...props
}: Omit<BoxProps, 'children'> & {
  isLoading?: boolean,
  transactions: TransactionSummaryEntity[]
  actions?: React.ReactNode;
}) {
  if (isLoading) {
    return (
      <Box {...props}>
        <Box display="flex" justifyContent="end" alignItems="center" mb={2}>
          <Skeleton variant="text" width={80} height={20} />
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {Array.from({ length: DEFAULT_COUNT }).map((_, idx) => (
            <Box key={idx} display="flex" alignItems="center" gap={2}>
              <Skeleton variant="circular" width={48} height={48} />

              <Box flex={1} display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" rowGap={2}>
                <Box>
                  <Skeleton variant="text" width={120} height={20} />
                  <Skeleton variant="text" width={100} height={16} />
                </Box>
                <Skeleton variant="text" width={60} height={20} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    )
  }

  if (!transactions?.length) {
    return (
      <Box {...props}>
        <Typography variant="body2" textAlign="center" py={2}>
          Tidak ada transaksi
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      {...props}
    >
      <Box display="flex" justifyContent="end" alignItems="center" mb={2}>
        {actions}
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {transactions?.map((tx, idx) => (
          <Box key={`${tx.type}-${tx.description}-${tx.transactionType}-${tx.amount}-${idx}`} display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{
                bgcolor: gray[50],
                color: green[500],
                width: 48,
                height: 48,
                borderRadius: '50%',
              }}
              variant="rounded"
            >
              <CustomIcon
                name={tx.type}
                fontSize={24}
              />
            </Avatar>
            <Box key={`${tx.type}-${tx.description}-${tx.transactionType}-${tx.amount}`} flex={1} display="flex" flexWrap="wrap" alignItems="center" justifyContent="space-between" gap={2}>
              <Box flex={1} overflow="hidden" width={0} textOverflow="ellipsis">
                <Typography variant="body2" fontWeight={500} whiteSpace="nowrap">
                  {getLabelFromTransactionType(tx.type)}
                </Typography>
                <Typography variant="caption" color="text.secondary" whiteSpace="nowrap">
                  {tx.description}
                </Typography>
              </Box>
              <Typography
                flex={1}
                variant="body2"
                fontWeight={700}
                textAlign="right"
                whiteSpace="nowrap"
                color={tx.amount > 0 ? 'success.main' : 'text.primary'}
              >
                {tx.amount > 0 && '+'}{formatCurrency(tx.amount)}
              </Typography>
            </Box>
          </Box>
        ))}

      </Box>
    </Box>
  );
}
