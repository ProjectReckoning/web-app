import formatCurrency from '@/lib/format-currency';
import { Box, Typography, Stack, LinearProgress, BoxProps } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

interface BEPInsightCardProps extends BoxProps {
  currentProfit: number;
  targetProfit: number;
  avgDailyProfit: number;
}

export default function BEPInsightCard({
  currentProfit,
  targetProfit,
  avgDailyProfit,
  ...props
}: BEPInsightCardProps) {
  const progressPercent = Math.min((currentProfit / targetProfit) * 100, 100);
  const remainingProfit = Math.max(targetProfit - currentProfit, 0);
  const estimatedDays = avgDailyProfit > 0 ? Math.ceil(remainingProfit / avgDailyProfit) : '-';

  return (
    <Box
      {...props}
    >
      <Box
        sx={{
          backgroundColor: 'limeGreen.main',
          px: 2,
          py: 1,
          borderRadius: 999,
          width: 'fit-content',
          mx: 'auto',
          mb: 2,
        }}
      >
        <Typography fontWeight="bold" variant='body2' padding={1} color="black">
          Insight
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', width: 200, height: 200, mx: 'auto', mt: 4 }}>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: progressPercent, color: '#B57BFF' },
                { id: 1, value: 100 - progressPercent, color: '#e0e0e0' },
              ],
              innerRadius: 50,
              outerRadius: 100,
              cx: '50%',
              cy: '50%',
            },
          ]}
          width={200}
          height={200}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            flexDirection: 'column',
          }}
        >
          <Box>
            <Typography variant="body1" fontWeight="bold">
              {Math.round(progressPercent)}%
            </Typography>
            {'\n'}
            <Typography variant='body2' color="text.secondary">
              dari BEP
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          border: 1,
          borderColor: 'border.main',
          borderRadius: 3,
          p: 2,
          mt: 4,
          textAlign: 'left',
        }}
      >
        <Typography variant='body2' color="text.secondary">
          Keuntungan bersih
        </Typography>

        <Typography fontWeight="bold" mb={1}>
          {formatCurrency(currentProfit)}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{
            height: 8,
            borderRadius: 999,
            backgroundColor: 'gray.light',
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'purple.main',
            },
          }}
        />
      </Box>

      <Stack spacing={1} mt={4} textAlign="center">
        <Typography variant="body2" mt={3}>
          Yeay! kamu sudah mencapai{' '}
          <Typography variant="body1" component="span" borderBottom={2} borderColor="tosca.main" fontWeight="bold">{Math.round(progressPercent)}%</Typography> dari BEP
        </Typography>
        <Typography variant="body2">
          dan <b>rata-rata keuntungan harian</b>{' '}
          <Typography variant="body1" component="span" borderBottom={2} borderColor="tosca.main" fontWeight="bold">{formatCurrency(avgDailyProfit, { maximumFractionDigits: 0 })}</Typography>
        </Typography>
        <Typography variant="body2">
          kamu butuh{' '}
          <Typography variant="body1" component="span" borderBottom={2} borderColor="tosca.main" fontWeight="bold">{estimatedDays} hari</Typography> lagi untuk mencapai BEP!
        </Typography>
      </Stack>
    </Box>
  );
}
