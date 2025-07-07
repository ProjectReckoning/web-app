'use client';

import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
import ChartWithTabs, { ChartData } from '@/features/insight/components/chart-with-tabs.component';
import TransactionOverviewCard from '@/features/insight/components/transactions-overview-card.component';
import PieChartWithTabs from '@/features/insight/components/pie-chart-with-tabs.component';
import { Link, Stack, useMediaQuery, useTheme } from '@mui/material';
import PocketCard from '@/features/pocket/components/pocket-card.component';
import IncomeOutcomeCard from '@/features/insight/components/income-outcome-card.component';
import ScheduledTransactionList from '@/features/schedule-transaction/components/scheduled-transactions-list.component';
import detailPocketStore from '@/features/pocket/stores/detail-pocket.store';
import transactionHistoryStore from '@/features/insight/stores/transaction-history.store';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gray } from '@/lib/custom-color';
import BEPInsightCard from '@/features/insight/components/bep-insight-card.component';
import bepStore from '@/features/insight/stores/bep.store';
import pocketStore from '@/features/pocket/stores/pocket.store';
import DateRangeSelector from '@/features/shared/components/date-range-selector.component';
import { GetTransactionDurationOption } from '@/features/insight/constants/get-transaction-history-duration-option.enum';
import { TransactionType } from '@/features/insight/constants/transaction-type.enum';
import { TransactionEntity } from '@/features/insight/entities/transaction.entities';
import CustomIcon from '@/features/shared/components/custom-icon.component';
import { getBackgroundColorFromTransactionType, getColorFromTransactionType } from '@/lib/get-color-from-transaction-type';
import { getTransactionCategoryFromString, TransactionCategory } from '@/features/insight/constants/transaction-category.enum';
import { BepProfit } from '@/features/insight/entities/bep-profit.entities';
import { BepLoss } from '@/features/insight/entities/bep-loss.entities';
import BEPModalInput from '@/features/insight/components/bep-modal-input.component';
import { PocketEntity } from '@/features/pocket/entities/pocket.entites';
import statsStore from '@/features/insight/stores/stats.store';
import { getLabelFromTransactionType } from '@/lib/get-label-from-transaction-type';
import scheduledTransactionsStore from '@/features/schedule-transaction/stores/scheduled-transaction.store';
import formatDate from '@/lib/format-date';
import { ScheduledTransactionEntity } from '@/features/schedule-transaction/entities/scheduled-transaction.entity';
import { PocketMemberRole } from '@/features/pocket/entities/detail-pocket.entities';

const StatsSampleData: ChartData[] = [
  {
    x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    label: 'Mingguan',
    series: {
      gaji: { data: [300_000, 320_000, 310_000, 330_000], color: '#ff6384' },
      transportasi: { data: [80_000, 75_000, 85_000, 90_000], color: '#36a2eb' },
      pemasukan: { data: [100_000, 120_000, 90_000, 150_000], color: '#ffce56' },
      tagihan: { data: [200_000, 200_000, 200_000, 200_000], color: '#4bc0c0' },
    },
  },
  {
    x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    label: 'Bulanan',
    series: {
      gaji: { data: [1_200_000, 1_500_000, 1_450_000, 1_600_000, 1_700_000, 1_750_000], color: '#ff6384' },
      transportasi: { data: [300_000, 350_000, 330_000, 400_000, 420_000, 450_000], color: '#36a2eb' },
      pemasukan: { data: [500_000, 600_000, 550_000, 700_000, 800_000, 900_000], color: '#ffce56' },
      tagihan: { data: [900_000, 950_000, 1_000_000, 1_050_000, 1_100_000, 1_150_000], color: '#4bc0c0' },
    },
  },
  {
    x: ['2020', '2021', '2022', '2023', '2024'],
    label: 'Tahunan',
    series: {
      gaji: { data: [14_000_000, 15_500_000, 16_200_000, 17_000_000, 18_000_000], color: '#ff6384' },
      transportasi: { data: [3_600_000, 4_200_000, 4_500_000, 4_800_000, 5_000_000], color: '#36a2eb' },
      pemasukan: { data: [6_000_000, 6_500_000, 7_200_000, 7_800_000, 8_500_000], color: '#ffce56' },
      tagihan: { data: [10_800_000, 11_400_000, 12_000_000, 12_600_000, 13_200_000], color: '#4bc0c0' },
    },
  },
];


export default function Page() {
  const { selectedPocket } = pocketStore();
  const { isLoading, pocket, updatePocket } = detailPocketStore();
  const {
    isLoading: isScheduledTransactionLoading,
    scheduledTransactions,
    getAllScheduledTransactions,
  } = scheduledTransactionsStore()
  const {
    isLoading: isTransactionLoading,
    last5Transactions,
    getLast5Transactions,
    transactions,
    getAllTransactions
  } = transactionHistoryStore();
  const { isLoading: isBepLoading, getBep, bep } = bepStore()
  const { isLoading: isStatsLoading, getStatsSpesificPocket, stats } = statsStore()
  const pathname = usePathname();
  const isPocketAdmin = pocket?.userRole === PocketMemberRole.Admin || pocket?.userRole === PocketMemberRole.Owner

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const pocketCount = stats?.length ?? 1;

  const chartHeight = isMobile
    ? Math.min(400, 200 + pocketCount * 100)
    : 250;

  const handleChangeBepModal = (value: number) => {
    if (pocket) {
      updatePocket({ targetNominal: value });
    }
  }

  useEffect(() => {
    if (!pocket) {
      return
    }

    getLast5Transactions();
    getStatsSpesificPocket(pocket.id);
    getAllTransactions({
      pocketId: pocket.id,
      duration: GetTransactionDurationOption.LAST_1_YEAR,
    });

    if (isPocketAdmin) {
      getAllScheduledTransactions(pocket.id);
      getBep(pocket.id)
    }

  }, [pocket, getLast5Transactions, getAllScheduledTransactions, getAllTransactions, getBep, getStatsSpesificPocket]);

  const mappedScheduledTransaction = useMemo(() => mapScheduledTransactions(scheduledTransactions), [scheduledTransactions]);

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
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
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
          width: "100%",
          maxWidth: theme.breakpoints.only("md"),
        }}
        >
          <PocketCard
            title={pocket?.name ?? ""}
            accountNumber={pocket?.accountNumber ?? ""}
            balance={pocket?.balance ?? 0}
            color={pocket?.color ?? gray[300]}
            icon={pocket?.icon ?? "pocket"}
            isLoading={isLoading || !pocket?.id}
            sx={{
              backgroundColor: isLoading ? "transparent" : pocket?.color ?? "gray.main",
              border: isLoading ? 1 : 0,
              borderColor: isLoading ? "border.main" : 'transparent',
              borderRadius: 4,
              padding: {
                xs: 1,
                sm: 3,
              },
              paddingRight: {
                xs: 0,
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
            display="flex"
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
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
        {isPocketAdmin ? (
          <ScheduledTransactionList
            title="Transaksi terjadwalmu"
            isLoading={isScheduledTransactionLoading || !scheduledTransactions}
            transactions={mappedScheduledTransaction}
            flex={1}
            minWidth={240}
          />
        ) : (
            <Box flex={1} minWidth={240}></Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: "space-between", flexWrap: 'wrap', gap: 4 }}>
        <Box sx={{ flex: 2, minWidth: 240, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h6'>Grafik Keuanganmu</Typography>
          <ChartWithTabs
            isDemo={!stats?.length}
            isLoading={isStatsLoading || !stats}
            data={stats?.length ? stats : StatsSampleData}
            sx={{
              border: 1,
              padding: 4,
              borderRadius: 10,
              borderColor: "border.main"
            }}
            height={chartHeight}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h6'>Transaksi terakhir</Typography>
          <TransactionOverviewCard
            isLoading={isTransactionLoading || !last5Transactions}
            transactions={last5Transactions ?? []}
            actions={
              <Link href={`${pathname}/transactions`} underline="always" color="orange.main">
                Lihat semua
              </Link>
            }
            sx={{
              border: 1,
              borderColor: "border.main",
              borderRadius: 8,
              padding: 4,
            }}
          />
        </Box>
      </Box>

      <Stack spacing={4}>
        <Typography variant='h5'>Rekap Keuanganmu</Typography>
        <Box sx={{ display: 'flex', justifyContent: "space-between", flexWrap: 'wrap', gap: 4 }}>
          <TransactionInsightSection
            flex={1}
            split={!isPocketAdmin}
            transactions={transactions ?? []}
            isTransactionLoading={isTransactionLoading}
            width="100%"
          />
          {isPocketAdmin && (
            <BepInsightSection
              bep={bep}
              onChangeBepModal={handleChangeBepModal}
              pocket={selectedPocket}
              isLoading={isBepLoading}
              flex={1}
              display="flex"
              flexDirection="column"
              gap={4}
              width="100%"
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
}

function BepInsightSection({
  bep,
  isLoading = false,
  onChangeBepModal,
  pocket,
  ...props
}: {
    bep: BepProfit | BepLoss | null;
  pocket: PocketEntity | null;
  isLoading?: boolean;
  onChangeBepModal?: (value: number) => void;
  } & BoxProps) {
  return (
    <Box
      {...props}
    >
      <BEPModalInput
        onSubmitChange={onChangeBepModal}
        sx={{ mx: { xs: 0, md: 4 } }} defaultValue={pocket?.targetNominal ?? 0}
      />
      <BEPInsightCard
        isLoading={isLoading || !bep || !pocket}
        bep={bep}
        flex={1}
        sx={{
          border: 1,
          borderColor: 'border.main',
          borderRadius: 10,
          backgroundColor: 'white',
          padding: 4,
          textAlign: 'center',
        }}
      />
    </Box>
  )
}

function TransactionInsightSection({
  transactions: inputTransactions,
  split = false,
  isTransactionLoading = false,
  ...props
}: {
  transactions: TransactionEntity[];
    split?: boolean;
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

  if (split) {
    return (
      <Box display={"flex"} flexDirection="column" gap={4} {...props}>
        <DateRangeSelector onChange={handleDateRangeChange} maxWidth={320} sx={{ mx: { xs: 0, md: 4 } }} />

        <Box flex={1} display={"flex"} flexWrap="wrap" justifyContent="stretch" gap={4} {...props}>
          {transactionOverviewData.map((it) => (
            <PieChartWithTabs
              flex={1}
              key={`${it.label}-${it.data}`}
              isLoading={isTransactionLoading || !showedTransactions}
              data={[it]}
              sx={{ border: 1, padding: 4, borderRadius: 10, borderColor: "border.main" }}
            />
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box flex={1} display={"flex"} flexDirection="column" gap={4} {...props}>
      <DateRangeSelector onChange={handleDateRangeChange} maxWidth={320} mx="auto" />
      <PieChartWithTabs
        isLoading={isTransactionLoading || !showedTransactions}
        data={transactionOverviewData}
        sx={{ border: 1, padding: 4, borderRadius: 10, borderColor: "border.main" }}
      />
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
          color,
          backgroundColor,
          icon: <CustomIcon name={category} style={{ color, fontSize: 24 }} />,
          transactionCount,
        }
      }),
    };
  });

  return result;
}

function mapScheduledTransactions(scheduledTransactions: ScheduledTransactionEntity[]) {
  const result = scheduledTransactions.map((it) => {
    const nextDate = new Date(it.nextRunDate);

    return {
      day: formatDate(nextDate, { weekday: "long" }),
      date: nextDate.getDate(),
      title: it.category ? it.category.charAt(0).toUpperCase() + it.category.slice(1) : "-",
      amount: it.recurringAmount,
    };
  });

  return result
}