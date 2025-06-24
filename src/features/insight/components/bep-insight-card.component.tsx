import Skeleton from '@/features/shared/components/skeleton';
import { gray, purple } from '@/lib/custom-color';
import formatCurrency from '@/lib/format-currency';
import { Box, Typography, Stack, LinearProgress, BoxProps } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BepProfit } from '../entities/bep-profit.entities';
import { BepLoss } from '../entities/bep-loss.entities';

interface BEPInsightCardProps extends BoxProps {
  bep?: BepProfit | BepLoss | null;
  isLoading?: boolean;
}

export default function BEPInsightCard({
  bep,
  isLoading = false,
  ...props
}: BEPInsightCardProps) {
  if (isLoading || !bep) {
    return (
      <Box {...props}>
        <Box
          sx={{
            backgroundColor: 'grey.300',
            px: 2,
            py: 1,
            borderRadius: 999,
            width: 'fit-content',
            mx: 'auto',
            mb: 2,
          }}
        >
          <Skeleton variant="text" width={40} height={24} />
        </Box>

        <Box sx={{ position: 'relative', width: 200, height: 200, mx: 'auto', mt: 4 }}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 60, color: gray[200] },
                  { id: 1, value: 40, color: gray[300] },
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
              flexDirection: 'column',
              pointerEvents: 'none',
            }}
          >
            <Skeleton variant="text" width={50} height={30} />
            <Skeleton variant="text" width={80} height={20} />
          </Box>
        </Box>

        <Box
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 3,
            p: 2,
            mt: 4,
            textAlign: 'left',
          }}
        >
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={120} height={30} sx={{ mb: 1 }} />
          <LinearProgress
            variant="indeterminate"
            sx={{
              height: 8,
              borderRadius: 999,
              backgroundColor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'grey.400',
              },
            }}
          />
        </Box>

        <Stack spacing={2} mt={4} alignItems="center">
          <Skeleton variant="text" width="70%" height={24} sx={{ mx: 'auto', display: "block", textAlign: "center" }} />
          <Skeleton variant="text" width="80%" height={24} sx={{ mx: 'auto' }} />
          <Skeleton variant="text" width="60%" height={24} sx={{ mx: 'auto' }} />
        </Stack>
      </Box>
    )
  }

  const isLoss = bep.status === 'loss';
  const progressPercent = isLoss ? 0 : bep.profitPercentage
  const currentProfit = isLoss ? bep.loss * -1 : bep.cleanProfit;


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
                { id: 0, value: progressPercent, color: purple[500] },
                { id: 1, value: 100 - progressPercent, color: gray[100] },
              ],
              innerRadius: 50,
              outerRadius: 100,
              cx: '50%',
              cy: '50%',
              valueFormatter: (v) => {
                const value = typeof v === "number" ? v : v?.value ?? 0;
                return formatCurrency(value);
              },
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

        <Typography fontWeight="bold" mb={1} sx={{ color: isLoss ? 'red.main' : 'purple.main' }}>
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

      <AdditionalInformation bep={bep} />
    </Box>
  );
}

function AdditionalInformation({ bep }: { bep: BepProfit | BepLoss }) {
  const isLoss = bep.status === 'loss';
  const progressPercent = isLoss ? 0 : bep.profitPercentage

  if (bep.status === 'profit') {
    return (
      <Stack spacing={1} mt={4} textAlign="center">
        <Typography variant="body2" mt={3}>
          Yeay! kamu sudah mencapai{' '}
          <Typography variant="body1" component="span" borderBottom={3} borderColor="tosca.main" fontWeight="bold">{Math.round(progressPercent)}%</Typography> dari BEP
        </Typography>
        <Typography variant="body2">
          dan <b>rata-rata keuntungan harian</b>{' '}
          <Typography variant="body1" component="span" borderBottom={3} borderColor="tosca.main" fontWeight="bold">{formatCurrency(bep.averageDailyCleanProfit, { maximumFractionDigits: 0 })}</Typography>
        </Typography>
        <Typography variant="body2">
          kamu butuh{' '}
          <Typography variant="body1" component="span" borderBottom={3} borderColor="tosca.main" fontWeight="bold">{bep.estimatedDaysToBEP} hari</Typography> lagi untuk mencapai BEP!
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={1} mt={4} textAlign="center">
      <Typography variant="body2" mt={3}>
        Sekarang kamu masih minus{' '}
        <Typography variant="body1" component="span" borderBottom={3} borderColor="red.main" fontWeight="bold">{formatCurrency(bep.loss)}</Typography>
      </Typography>
      <Typography variant="body2">
        dengan <b>rata-rata penjualan</b>{' '}
        <Typography variant="body1" component="span" borderBottom={3} borderColor="tosca.main" fontWeight="bold">{formatCurrency(bep.averageDailyCleanProfit, { maximumFractionDigits: 0 })}</Typography>
      </Typography>
      {bep.projections.map((projection) => (
        <Typography key={projection.estimatedDaysToCoverLoss} variant="body2">
          Kamu butuh{' '}
          <Typography variant="body1" component="span" borderBottom={3} borderColor="tosca.main" fontWeight="bold">{projection.estimatedDaysToCoverLoss} hari</Typography>{' '} kedepan dengan target harian {' '}
          <Typography variant="body1" component="span" borderBottom={3} borderColor="tosca.main" fontWeight="bold">{formatCurrency(projection.increasedIncome, { maximumFractionDigits: 0 })}</Typography> buat tutup kerugian
        </Typography>
      ))}
    </Stack>
  )
}
