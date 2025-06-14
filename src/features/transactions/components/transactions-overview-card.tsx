'use client';

import { Box, Typography, Avatar, Link, Icon, BoxProps } from '@mui/material';
import formatCurrency from '@/lib/format-currency';

interface TransactionItem {
  type: 'transfer' | 'qris';
  description: string;
  detail: string;
  amount: number;
}

const transactions: TransactionItem[] = [
  { type: 'transfer', description: 'Transfer', detail: 'BNI - Ivanka', amount: -30000 },
  { type: 'transfer', description: 'Transfer', detail: 'BNI - Ivanka', amount: 30000 },
  { type: 'transfer', description: 'Transfer', detail: 'BNI - Ivanka', amount: -30000 },
  { type: 'qris', description: 'Qris Payment', detail: 'Sembako', amount: 30000 },
  { type: 'qris', description: 'Qris Payment', detail: 'Amira Ferial', amount: -30000 },
];

export default function TransactionOverviewCard({ ...props }: BoxProps) {
  return (
    <Box
      {...props}
    >
      <Box display="flex" justifyContent="end" alignItems="center" mb={2}>
        <Link href="#" underline="always" color="orange.main">
          Lihat semua
        </Link>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {transactions.map((tx, idx) => (
          <Box key={idx} display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'gray.light', padding: 3 }}>
              <Icon sx={{ color: 'green.main' }}>qr_code_scanner</Icon>
            </Avatar>
            <Box key={idx} flex={1} display="flex" flexWrap="wrap" alignItems="center" justifyContent="space-between" rowGap={2}>
              <Box >
                <Typography variant="body2" fontWeight={500}>
                  {tx.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {tx.detail}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                fontWeight={700}
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
