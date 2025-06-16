'use client';

import { Box, Typography, BoxProps } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RestaurantIcon from '@mui/icons-material/Restaurant';

interface PocketCardProps extends BoxProps {
  title: string;
  accountNumber: string;
  balance: number;
  icon?: React.ReactNode;
  showBalance?: boolean;
}

export default function PocketCard({
  title,
  accountNumber,
  balance,
  icon = <RestaurantIcon fontSize="large" sx={{ color: 'white' }} />,
  showBalance = true,
  ...props
}: PocketCardProps) {
  return (
    <Box
      sx={{
        borderRadius: 4,
        background: 'linear-gradient(135deg, #FF8C00 30%, #FFA500 90%)',
        color: 'white',
        p: 3,
        position: 'relative',
        overflow: 'hidden',
        minWidth: 300,
      }}
      {...props}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          sx={{
            bgcolor: 'white',
            width: 50,
            height: 50,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Box flex={1}>
          <Typography fontWeight="bold" color="black">
            {title}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontWeight="bold" color="black">
              {accountNumber}
            </Typography>
            <ContentCopyIcon sx={{ fontSize: 16, color: 'black' }} />
          </Box>
        </Box>
      </Box>

      <Box mt={3}>
        <Typography fontSize={14} color="black">
          Saldo
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h5" fontWeight="bold" color="black">
            {showBalance ? `Rp${balance.toLocaleString()}` : '•••••••'}
          </Typography>
          <VisibilityOffIcon sx={{ color: 'black' }} />
        </Box>
      </Box>
    </Box>
  );
}