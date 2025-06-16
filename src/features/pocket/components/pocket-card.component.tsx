'use client';

import { Box, Typography, BoxProps, IconButton } from '@mui/material';
import { orange } from '@/lib/custom-color';
import { useState } from 'react';
import formatCurrency from '@/lib/format-currency';
import DoughnutShape from '@/features/shared/components/doughnut-shape.component';
import { Icon } from '@iconify/react';

interface PocketCardProps extends BoxProps {
  title: string;
  accountNumber: string;
  balance: number;
  icon: string;
  showBalance?: boolean;
}

export default function PocketCard({
  title,
  accountNumber,
  balance,
  icon,
  ...props
}: PocketCardProps) {
  const [showBalanceState, setShowBalanceState] = useState(false);

  return (
    <Box
      position="relative"
      overflow="hidden"
      color="white"
      {...props}
    >
      <DoughnutShape
        width={600}
        height={600}
        innerRatio={0.5}
        innerColor='orange.main'
        sx={{
          backgroundColor: orange[400],
          position: 'absolute',
          top: -300,
          left: -420,
        }}
      />

      <Box display="flex" position="relative" alignItems="center" gap={2} zIndex={3}>
        <Box
          sx={{
            bgcolor: 'orange.main',
            width: 64,
            height: 64,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon icon={icon} style={{ fontSize: 32, color: 'white' }} />
        </Box>

        <Box flex={1}>
          <Typography color="black">
            {title}
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontWeight="bold" color="black">
              {accountNumber}
            </Typography>
            <IconButton
              onClick={() => navigator.clipboard.writeText(accountNumber)}
              sx={{ padding: 0, color: 'black' }}
              aria-label="Copy account number"
            >
              <Icon icon="iconamoon:copy" style={{ fontSize: 16, color: 'black' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box position="relative" mt={3}>
        <Typography fontSize={14} color="black">
          Saldo
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h5" fontWeight="bold" color="black">
            {showBalanceState ? formatCurrency(balance) : '******'}
          </Typography>

          <IconButton onClick={() => setShowBalanceState(!showBalanceState)}>
            {showBalanceState ? (
              <Icon icon="ion:eye-off-outline" style={{ fontSize: 24, color: 'black' }} />
            ) : (
              <Icon icon="ion:eye-outline" style={{ fontSize: 24, color: 'black' }} />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}