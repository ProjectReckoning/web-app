"use client";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PocketCard from '@/features/pocket/components/pocket-card.component';
import IncomeOutcomeCard from '@/features/insight/components/income-outcome-card.component';
import detailPocketStore from '@/features/pocket/stores/detail-pocket.store';
import TopContributorsCard from '@/features/pocket/components/top-contributor-card.component';
import FinanceSummaryCard from '@/features/insight/components/finance-summary-card.component';
import TransactionTable from '@/features/insight/components/transactions-table.component';
import transactionHistoryStore from '@/features/insight/stores/transaction-history.store';
import React, { useEffect, useMemo, useState } from 'react';
import { GetTransactionDurationOption } from '@/features/insight/constants/get-transaction-history-duration-option.enum';
import formatCurrency from '@/lib/format-currency';
import { gray } from '@/lib/custom-color';
import { useSearchParams } from 'next/navigation';
import { getLabelFromTransactionType } from '@/lib/get-label-from-transaction-type';
import { useTheme } from '@emotion/react';

export default function Page() {
  const { isLoading, pocket } = detailPocketStore();
  const {
    transactions,
    getAllTransactions,
    isLoading: isTransactionStoreLoading,
    previousBalance: pocketPreviousBalance,
    closingBalance: pocketClosingBalance,
    totalIncome: pocketTotalIncome,
    totalOutcome: pocketTotalOutcome,
  } = transactionHistoryStore()

  const searchParams = useSearchParams()
  const queryType = searchParams.get('type')
  const theme = useTheme()

  const contributors = useMemo(() => {
    if (!pocket) {
      return [];
    }

    const members = [
      pocket.owner,
      ...(pocket.members ?? []),
    ]

    const totalContribution: number = members.reduce((sum, member) => {
      const contribution = member.metadata?.contributionAmount ?? 0

      if (contribution >= 0) {
        return sum + contribution;
      }

      return 0
    }, 0);

    if (totalContribution === 0) {
      return [];
    }

    return members.map(member => {
      const contributionAmount = member.metadata?.contributionAmount ?? 0;
      const percentage = ((contributionAmount / totalContribution) * 100).toFixed(2);
      return {
        name: member.name,
        percentage: `${percentage}%`,
        amount: formatCurrency(contributionAmount),
      };
    }).sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage)).slice(0, 3);
  }, [pocket]);

  const mappedTransactionData = useMemo(() => {
    if (!transactions) {
      return []
    }

    return transactions.map(row => ({
      waktu: <Box key={row.createdAt} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='body1'>
          {new Date(row.createdAt).toLocaleDateString('id-ID', {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Typography>
        <Typography variant='body2' sx={{ color: 'gray.main' }}>
          {new Date(row.createdAt).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })} WIB
        </Typography>
      </Box>,
      transaksi: row.initiatorUser,
      tipe: row.transactionType.charAt(0).toUpperCase() + row.transactionType.slice(1),
      jumlah: formatCurrency(row.amount),
      kategori: getLabelFromTransactionType(row.type),
    }));
  }, [transactions]);

  const transactionCategories = Array.from(new Set((mappedTransactionData ?? []).map(row => row.kategori)))

  const defaultSelectedCategory = transactionCategories.find((it) => it.toLowerCase() === queryType?.toLowerCase())
  const [selectedCategory, setSelectedCategory] = useState(defaultSelectedCategory ?? 'Semua');
  const [selectedDuration, setSelectedDuration] = useState('30 hari terakhir');

  const financeSummaryItems = useMemo(() => {
    return [
      { title: 'Saldo Awal', amount: formatCurrency(pocketPreviousBalance ?? 0) },
      { title: 'Total Pemasukan', amount: `+${formatCurrency(pocketTotalIncome ?? 0)}` },
      { title: 'Total Pengeluaran', amount: formatCurrency((pocketTotalOutcome ?? 0) * -1) },
      { title: 'Saldo Akhir', amount: formatCurrency(pocketClosingBalance ?? 0) },
    ];
  }, [pocketPreviousBalance, pocketTotalIncome, pocketTotalOutcome, pocketClosingBalance]);

  useEffect(() => {
    if (pocket && !transactions) {
      getAllTransactions({
        pocketId: pocket.id,
        duration: GetTransactionDurationOption.LAST_30_DAYS,
      });
    }
  }, [pocket, getAllTransactions]);

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="stretch" flexWrap="wrap" gap={2}>
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
            lg: 'row',
          },
          gap: 2,
          flex: 1,
          width: "100%",
          maxWidth: theme.breakpoints.only("md"),
        }}>
          <PocketCard
            title={pocket?.name ?? ""}
            accountNumber={pocket?.accountNumber ?? ""}
            balance={pocket?.balance ?? 0}
            color={pocket?.color ?? gray[300]}
            icon={pocket?.icon ?? "pocket"}
            isLoading={isLoading || !pocket}
            sx={{
              backgroundColor: isLoading ? "gray.main" : pocket?.color ?? "gray.main",
              border: isLoading ? 1 : 0,
              borderColor: isLoading ? "border.main" : 'transparent',
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
            minWidth={240}
            height="100%"
            flex={1}
          />
          <IncomeOutcomeCard
            isLoading={isLoading || !pocket}
            top="10%"
            bottom="10%"
            right={0}
            income={pocket?.income ?? 0}
            expense={pocket?.outcome ?? 0}
            sx={{
              backgroundColor: "white",
              position: {
                xs: 'static',
                lg: 'absolute',
              },
            }}
            minWidth={240}
            flex={1}
          />
        </Box>
        <TopContributorsCard
          isLoading={isLoading || !pocket}
          flex={1}
          sx={{
            minWidth: 240,
          }}
          contributors={contributors}
          href={`/dashboard/${pocket?.id}/members`}
        />
      </Box>

      <Typography variant='h5' mt={8}>
        Rekap Keuanganmu
      </Typography>

      <FinanceSummaryCard
        isLoading={isTransactionStoreLoading || !mappedTransactionData}
        items={financeSummaryItems}
        borderRadius={4}
        overflow="hidden"
        gap={1}
        mt={2}
      />

      <TransactionTable
        data={mappedTransactionData ?? []}
        isLoading={isTransactionStoreLoading || !mappedTransactionData}
        filters={[
          {
            label: 'Kategori',
            startAdornment: <Typography mr={1} variant='body2' sx={{ color: "gray.main" }}>Kategori:</Typography>,
            options: ['Semua', ...(mappedTransactionData?.length ?? 0) > 0 ? Array.from(new Set((mappedTransactionData ?? []).map(row => row.kategori))) : []],
            onFilter: (row, selected) => selected === 'Semua' || (row.kategori as string).toLowerCase() === selected.toLowerCase(),
            onChange: (val) => setSelectedCategory(val),
            defaultValue: selectedCategory ?? 'Semua',
          },
          {
            label: 'Durasi',
            startAdornment: <Typography mr={1} variant='body2' sx={{ color: "gray.main" }}>Durasi:</Typography>,
            options: ['30 hari terakhir', '3 bulan terakhir', '6 bulan terakhir', '1 tahun terakhir'],
            onFilter: () => true,
            onChange: async (selected) => {
              if (!pocket) return;

              setSelectedDuration(selected)

              getAllTransactions({
                pocketId: pocket.id,
                duration: mapDurationStringToOption(selected),
              });
            },
            defaultValue: selectedDuration
          }
        ]}
        mt={6}
      />
    </>
  );
}

function mapDurationStringToOption(duration: string): GetTransactionDurationOption {
  switch (duration) {
    case '30 hari terakhir':
      return GetTransactionDurationOption.LAST_30_DAYS;
    case '3 bulan terakhir':
      return GetTransactionDurationOption.LAST_3_MONTHS;
    case '6 bulan terakhir':
      return GetTransactionDurationOption.LAST_6_MONTHS;
    case '1 tahun terakhir':
      return GetTransactionDurationOption.LAST_1_YEAR;
    default:
      return GetTransactionDurationOption.LAST_30_DAYS;
  }
}