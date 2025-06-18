'use client';

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PocketCard from '@/features/pocket/components/pocket-card.component';
import IncomeOutcomeCard from '@/features/insight/components/icome-outcome-card.component';
import Loading from '@/features/shared/components/loading.component';
import detailPocketStore from '@/features/pocket/stores/detail-pocket.store';
import TopContributorsCard from '@/features/pocket/components/top-contributor-card.component';
import FinanceSummaryCard, { FinanceSummaryItem } from '@/features/insight/components/finance-summary-card.component';
import TransactionTable from '@/features/insight/components/transactions-table.component';

const contributors = [
  { name: 'Ivanka Larasati', percentage: '50%', amount: 'Rp10.000.000' },
  { name: 'Amira Ferial', percentage: '50%', amount: 'Rp10.000.000' },
  { name: 'Farrel Brian Rafi', percentage: '50%', amount: 'Rp10.000.000' },
];

const summaryItems: FinanceSummaryItem[] = [
  { title: 'Saldo Kemarin', amount: 'Rp1.199.372' },
  { title: 'Total Pemasukan', amount: '+ Rp7.048.943', },
  { title: 'Total Pengeluaran', amount: '- Rp7.044.870', },
  { title: 'Saldo Penutupan', amount: 'Rp1.203.445' },
];



export default function Page() {
  const { isLoading, pocket } = detailPocketStore();

  if (isLoading || !pocket) {
    return (
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <Loading />
      </Box>
    );
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="stretch" flexWrap="wrap" gap={2}>
        <Box sx={{
          position: {
            xs: 'static',
            md: 'relative',
          },
          display: {
            xs: 'flex',
            md: 'block',
          },
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: 2,
          flex: 1,
        }}>
          <PocketCard
            title={pocket.name}
            accountNumber={pocket.accountNumber}
            balance={pocket.balance}
            color={pocket.color}
            icon="material-symbols:money-bag-outline"
            sx={{
              backgroundColor: pocket.color,
              borderRadius: 4,
              padding: 3,
              paddingRight: {
                xs: 8,
                md: 16,
              },
              marginRight: {
                xs: 0,
                md: 24,
              }
            }}
            minWidth={300}
            height="100%"
            flex={1}
          />
          <IncomeOutcomeCard
            top="10%"
            bottom="10%"
            right={0}
            income={pocket.income}
            expense={pocket.outcome}
            sx={{
              backgroundColor: 'white',
              position: {
                xs: 'static',
                md: 'absolute',
              },
            }}
            minWidth={240}
            flex={1}
          />
        </Box>
        <TopContributorsCard
          flex={1}
          sx={{
            minWidth: 300,
          }}
          contributors={contributors}
          onSeeAll={() => console.log('Lihat semua diklik')}
        />
      </Box>

      <Typography variant='h5' mt={8}>
        Rekap Keuanganmu
      </Typography>

      <FinanceSummaryCard items={summaryItems} backgroundColor='limeGreen.main' borderRadius={4} mt={2} />

      <TransactionTable mt={6} />
    </>
  );
}
