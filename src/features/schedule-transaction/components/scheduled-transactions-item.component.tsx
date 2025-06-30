import formatCurrency from "@/lib/format-currency";
import { Box, Typography } from "@mui/material";

export interface ScheduledTransactionItemProps {
  day: string;
  date: number;
  title: string;
  amount: number;
}

export default function ScheduledTransactionItem({
  day,
  date,
  title,
  amount,
}: Readonly<ScheduledTransactionItemProps>) {
  return (
    <Box
      sx={{
        display: 'flex',
        border: '1px solid #ccc',
        borderRadius: 4,
        overflow: 'hidden',
        minWidth: 240,
        mb: 2,
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          bgcolor: 'transparent',
          textAlign: 'center',
          p: 1.5,
          px: 2,
          borderRight: 1,
          borderColor: "border.main"
        }}
      >
        <Typography fontSize={14} fontWeight={500} color="purple.main">
          {day}
        </Typography>
        <Typography fontSize={20} fontWeight={700} color="purple.main">
          {date}
        </Typography>
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
        <Typography fontSize={13} color="text.secondary">
          {title}
        </Typography>
        <Typography fontSize={16} fontWeight="bold" color="black">
          {formatCurrency(amount, { maximumFractionDigits: 0 })}
        </Typography>
      </Box>
    </Box>
  );
}