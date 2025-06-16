import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ChartWithTabs, { ChartData } from '@/features/insight/components/chart-with-tabs.component';
import TransactionOverviewCard from '@/features/transactions/components/transactions-overview-card.component';
import DateRangeSelector from '@/features/shared/components/date-range-selector.component';
import PieChartWithTabs, { PieChartTabData } from '@/features/insight/components/pie-chart-with-tabs.component';
import BEPInsightCard from '@/features/insight/components/bep-insight-card.component';
import { Stack } from '@mui/material';
import PocketCard from '@/features/pocket/components/pocket-card.component';
import IncomeOutcomeCard from '@/features/insight/components/icome-outcome-card.component';
import ScheduledTransactionList from '@/features/schedule-transaction/components/scheduled-transactions-list.component';
import { Icon } from '@iconify/react';

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

const sampleData: PieChartTabData[] = [
  {
    label: 'Pemasukan',
    data: [
      {
        label: 'Penjualan',
        value: 770000,
        color: '#B57BFF',
        icon:  <Icon icon="mdi:upload" style={{ color: 'white' }} />,
        transactionCount: 8,
      },
      {
        label: 'Top up',
        value: 330000,
        color: '#48DDE0',
        icon: <Icon icon="mdi:download" style={{ color: 'white' }} />,
        transactionCount: 2,
      },
    ],
  },
  {
    label: 'Pengeluaran',
    data: [
      {
        label: 'Salary',
        value: 40000,
        color: '#FFD700',
        icon:  <Icon icon="mdi:currency-usd" style={{ color: 'white' }} />,
        transactionCount: 1,
      },
      {
        label: 'Withdraw',
        value: 20000,
        color: '#FFB6FF',
        icon: <Icon icon="mdi:currency-usd" style={{ color: 'white' }} />,
        transactionCount: 1,
      },
      {
        label: 'Other',
        value: 30000,
        color: '#B0B0B0',
        icon: <Icon icon="mdi:currency-usd" style={{ color: 'white' }} />,
        transactionCount: 1,
      },
    ],
  },
];

export default function Page() {
  return (
    <Box
      sx={{
        my: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: "stretch",
        gap: 8,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Box sx={{
          position: {
            xs: 'static',
            lg: 'relative',
          },
          display: {
            xs: 'flex',
            lg: 'block',
          },
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: 2,
          flex: 1,
        }}>
          <PocketCard
            title="Donat Bahagia"
            accountNumber="02389280392"
            balance={1000000}
            icon="material-symbols:money-bag-outline"
            sx={{
              backgroundColor: 'orange.main',
              borderRadius: 4,
              padding: 3,
              paddingRight: {
                xs: 8,
                lg: 16,
              },
              marginRight: {
                xs: 0,
                lg: 24,
              }
            }}
            minWidth={300}
            flex={1}
          />
          <IncomeOutcomeCard
            top="10%"
            bottom="10%"
            right={0}
            income={1100000}
            expense={100000}
            sx={{
              backgroundColor: 'white',
              position: {
                xs: 'static',
                lg: 'absolute',
              },
            }}
            minWidth={240}
            flex={1}
          />
        </Box>
        <ScheduledTransactionList
          title="Transaksi terjadwalmu"
          transactions={[
            { day: 'Sabtu', date: 21, title: 'PLN - 1234567806', amount: 100000 },
            { day: 'Sabtu', date: 21, title: 'PLN - 1234567806', amount: 100000 },
            { day: 'Sabtu', date: 21, title: 'PLN - 1234567806', amount: 100000 },
          ]}
          flex={1}
          minWidth={300}
        />

      </Box>

      <Stack spacing={2}>
        <Typography variant='h6'>
          Pilih Periode
        </Typography>
        <Box width="fit-content">
          <DateRangeSelector />
        </Box>
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: "space-between", flexWrap: 'wrap', gap: 4 }}>
        <Box sx={{ flex: 2, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h6'>Grafik Keuanganmu</Typography>
          <ChartWithTabs data={DATA} sx={{ border: 1, padding: 4, borderRadius: 10, borderColor: "border.main" }} height={250} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h6'>Transaksi terakhir</Typography>
          <TransactionOverviewCard sx={{
            border: 1,
            borderColor: "border.main",
            borderRadius: 8,
            padding: 4,
          }} />
        </Box>
      </Box>

      <Stack spacing={2}>
        <Typography variant='h6'>Rekap Keuanganmu</Typography>
        <Box sx={{ display: 'flex', justifyContent: "space-between", flexWrap: 'wrap', gap: 4 }}>
          <PieChartWithTabs flex={1} sx={{ border: 1, padding: 4, borderRadius: 10, borderColor: "border.main" }} data={sampleData} />
          <BEPInsightCard flex={1} currentProfit={10000000} targetProfit={20000000} avgDailyProfit={1000000} sx={{
            border: 1,
            borderColor: 'border.main',
            borderRadius: 10,
            backgroundColor: 'white',
            padding: 4,
            textAlign: 'center',
          }} />
        </Box>
      </Stack>
    </Box>
  );
}
