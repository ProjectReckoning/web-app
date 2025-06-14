import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ChartWithTabs, { ChartData } from '@/features/insight/components/chart-with-tabs';
import PocketOverviewCard from '@/features/pocket/components/pocket-overview-card';
import TransactionOverviewCard from '@/features/transactions/components/transactions-overview-card';

const DATA: ChartData[] = [
  {
    x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    label: 'Pengeluaran',
    series: {
      makanan: { data: [1_200_000, 1_500_000, 1_450_000, 1_600_000, 1_700_000, 1_750_000], color: '#ff6384' },
      transportasi: { data: [300_000, 350_000, 330_000, 400_000, 420_000, 450_000], color: '#36a2eb' },
      hiburan: { data: [500_000, 600_000, 550_000, 700_000, 800_000, 900_000], color: '#ffce56' },
      tagihan: { data: [900_000, 950_000, 1_000_000, 1_050_000, 1_100_000, 1_150_000], color: '#4bc0c0' },
    },
  },
  {
    x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    label: 'Pemasukan',
    series: {
      gaji: { data: [7_000_000, 7_000_000, 7_000_000, 7_500_000, 8_000_000, 8_000_000], color: '#81c784' },
      freelance: { data: [1_000_000, 1_200_000, 1_000_000, 1_500_000, 1_600_000, 1_800_000], color: '#9575cd' },
      investasi: { data: [250_000, 300_000, 320_000, 350_000, 370_000, 400_000], color: '#ffb74d' },
    },
  },
];


export default function Page() {
  return (
    <Box
      sx={{
        my: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "stretch",
        gap: 8,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', width: '100%' }}>
        <PocketOverviewCard />
        <PocketOverviewCard />
        <PocketOverviewCard />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: "space-between", flexWrap: 'wrap', gap: 4 }}>
        <Box sx={{ flex: 2, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h6'>Grafik Keuanganmu</Typography>
          <ChartWithTabs data={DATA} sx={{ border: 1, padding: 4, borderRadius: 10, borderColor: "gray.light" }} height={250} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h6'>Transaksi terakhir</Typography>
          <TransactionOverviewCard sx={{
            border: 1,
            borderColor: "gray.light",
            borderRadius: 8,
            padding: 4,
          }} />
        </Box>
      </Box>
    </Box>
  );
}
