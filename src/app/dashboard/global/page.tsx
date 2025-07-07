'use client';

import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
import ChartWithTabs from '@/features/insight/components/chart-with-tabs.component';
import TransactionOverviewCard from '@/features/insight/components/transactions-overview-card.component';
import DateRangeSelector from '@/features/shared/components/date-range-selector.component';
import PieChartWithTabs from '@/features/insight/components/pie-chart-with-tabs.component';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import pocketStore from '@/features/pocket/stores/pocket.store';
import { useEffect, useMemo, useState } from 'react';
import PocketOverviewList from '@/features/pocket/components/pocket-overview-list.component';
import transactionHistoryStore from '@/features/insight/stores/transaction-history.store';
import statsStore from '@/features/insight/stores/stats.store';
import { GetTransactionDurationOption } from '@/features/insight/constants/get-transaction-history-duration-option.enum';
import { getTransactionCategoryFromString, TransactionCategory } from '@/features/insight/constants/transaction-category.enum';
import { TransactionType } from '@/features/insight/constants/transaction-type.enum';
import { TransactionEntity } from '@/features/insight/entities/transaction.entities';
import CustomIcon from '@/features/shared/components/custom-icon.component';
import { getBackgroundColorFromTransactionType, getColorFromTransactionType } from '@/lib/get-color-from-transaction-type';
import { getLabelFromTransactionType } from '@/lib/get-label-from-transaction-type';

export default function Page() {
  const { pockets, isLoading, getAllPockets } = pocketStore()
  const { isLoading: isStatsLoading, getStatsGlobalPocket, stats } = statsStore()
  const { last5Transactions, getLast5Transactions, isLoading: isTransactionLoading, allPocketsTransactions, getAllPocketsTransactions } = transactionHistoryStore()

  useEffect(() => {
    getLast5Transactions();
    getStatsGlobalPocket();

    if (!pockets) {
      getAllPockets();
    }
  }, []);


  const nonMemberPockets = useMemo(() => {
    return (pockets ?? []).filter((pocket) => pocket.userRole !== 'member');
  }, [pockets]);

  useEffect(() => {
    const pocketIds = nonMemberPockets.map((pocket) => pocket.id);
    getAllPocketsTransactions({ pocketIds, duration: GetTransactionDurationOption.LAST_1_YEAR });
  }, [nonMemberPockets])

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const pocketCount = pockets?.length ?? 1;

  const chartHeight = isMobile
    ? Math.min(400, 200 + pocketCount * 100)
    : 250;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: "stretch",
        gap: 8,
      }}
    >
      <PocketOverviewList
        isLoading={isLoading ?? !pockets}
        pockets={nonMemberPockets ?? []}
        sx={{ gap: 3, overflowX: 'auto', width: '100%' }}
      />

      <Box sx={{ display: 'flex', justifyContent: "space-between", flexWrap: 'wrap', gap: 4 }}>
        <Box sx={{ flex: 2, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h5'>Grafik Keuanganmu</Typography>
          <ChartWithTabs
            isLoading={isStatsLoading || !stats}
            data={stats || []}
            sx={{ border: 1, padding: 4, borderRadius: 10, borderColor: "border.main" }}
            height={chartHeight}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h5'>Transaksi terakhir</Typography>
          <TransactionOverviewCard
            transactions={last5Transactions ?? []}
            isLoading={isTransactionLoading || !last5Transactions}
            sx={{
              border: 1,
              borderColor: "border.main",
              borderRadius: 8,
              padding: 4,
            }} />
        </Box>
      </Box>

      <Stack spacing={4}>
        <Typography variant='h6'>Rekap Keuanganmu</Typography>
        <TransactionInsightSection isTransactionLoading={isTransactionLoading || !allPocketsTransactions} transactions={allPocketsTransactions ?? []} />
      </Stack>
    </Box>
  );
}

function TransactionInsightSection({
  transactions: inputTransactions,
  isTransactionLoading = false,
  ...props
}: {
  transactions: TransactionEntity[];
  isTransactionLoading?: boolean;
} & BoxProps) {
  const [showedTransactions, setShowedTransactions] = useState<TransactionEntity[] | null>(null);
  const transactionOverviewData = useMemo(() => mapTransactionData(showedTransactions ?? []), [showedTransactions]);

  const handleDateRangeChange = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
    const filteredTransactions = inputTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    setShowedTransactions(filteredTransactions);
  };

  useEffect(() => {
    setShowedTransactions(inputTransactions);
  }, [inputTransactions]);

  return (
    <Box display="flex" flexDirection="column" gap={4} {...props}>
      <Box width="fit-content">
        <DateRangeSelector onChange={handleDateRangeChange} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: "space-between", flexWrap: 'wrap', gap: 4 }}>
        <Box display="flex" flexDirection="column" gap={2} flex={1}>
          <PieChartWithTabs
            isLoading={isTransactionLoading || !showedTransactions}
            flex={1}
            sx={{ border: 1, padding: 4, borderRadius: 10, borderColor: "border.main" }}
            showAction={false}
            data={[transactionOverviewData?.[0] ?? []]}
          />
        </Box>

        <Box display="flex" flexDirection="column" gap={2} flex={1}>
          <PieChartWithTabs
            isLoading={isTransactionLoading || !showedTransactions}
            flex={1}
            sx={{ border: 1, padding: 4, borderRadius: 10, borderColor: "border.main" }}
            showAction={false}
            data={[transactionOverviewData?.[1] ?? []]}
          />
        </Box>
      </Box>
    </Box>
  )
}

function mapTransactionData(transactions: TransactionEntity[]) {
  const grouped: Record<TransactionType, Record<string, { value: number; transactionCount: number }>> = {
    [TransactionType.INCOME]: {},
    [TransactionType.OUTCOME]: {},
  };

  for (const transaction of transactions) {
    const category = getTransactionCategoryFromString(transaction.type);
    const type = transaction.transactionType;

    if (!grouped[type][category]) {
      grouped[type][category] = { value: 0, transactionCount: 0 };
    }

    grouped[type][category].value += transaction.amount;
    grouped[type][category].transactionCount += 1;
  }

  const result = Object.entries(grouped).map(([typeStr, data]) => {
    const type = typeStr as TransactionType;
    return {
      label: type === TransactionType.OUTCOME ? 'Pengeluaran' : 'Pemasukan',
      data: Object.entries(data).map(([category, { value, transactionCount }]) => {
        const categoryEnum = category as TransactionCategory
        const backgroundColor = getBackgroundColorFromTransactionType(categoryEnum);
        const color = getColorFromTransactionType(categoryEnum)

        return {
          label: getLabelFromTransactionType(categoryEnum),
          value,
          backgroundColor,
          color,
          icon: <CustomIcon name={categoryEnum} style={{ color, fontSize: 24 }} />,
          transactionCount,
        }
      }),
    };
  });

  return result;
}