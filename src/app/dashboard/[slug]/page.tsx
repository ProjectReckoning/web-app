'use client';

import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
import ChartWithTabs from '@/features/insight/components/chart-with-tabs.component';
import TransactionOverviewCard from '@/features/insight/components/transactions-overview-card.component';
import PieChartWithTabs from '@/features/insight/components/pie-chart-with-tabs.component';
import { Link, Stack } from '@mui/material';
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
import { getColorFromTransactionType } from '@/lib/get-color-from-transaction-type';
import { getTransactionCateogryFromString } from '@/features/insight/constants/transaction-category.enum';
import { BepProfit } from '@/features/insight/entities/bep-profit.entities';
import { BepLoss } from '@/features/insight/entities/bep-loss.entities';
import BEPModalInput from '@/features/insight/components/bep-modal-input.component';
import { PocketEntity } from '@/features/pocket/entities/pocket.entites';
import statsStore from '@/features/insight/stores/stats.store';

export default function Page() {
  const { selectedPocket } = pocketStore();
  const { isLoading, pocket, updatePocket } = detailPocketStore();
  const {
    isLoading: isTransactionLoading,
    last5Transactions,
    getLast5Transactions,
    transactions,
    getAllTransactions
  } = transactionHistoryStore();
  const { isLoading: isBepLoading, getBep, bep } = bepStore()
  const { isLoading: isStatsLoading, getStatsSpesificPocket: getStats, stats } = statsStore()
  const pathname = usePathname();

  const handleChangeBepModal = (value: number) => {
    if (pocket) {
      updatePocket({ targetNominal: value });
    }
  }

  useEffect(() => {
    if (
      pocket &&
      (pocket.id !== selectedPocket?.id || !transactions?.length || !last5Transactions?.length || !bep || !stats)
    ) {
      getLast5Transactions();
      getAllTransactions({
        pocketId: pocket.id,
        duration: GetTransactionDurationOption.LAST_1_YEAR,
      });
      getBep(pocket.id);
      getStats(pocket.id);
    }

  }, [pocket, selectedPocket, getLast5Transactions]);

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
        }}
        >
          <PocketCard
            title={pocket?.name ?? ""}
            accountNumber={pocket?.accountNumber ?? ""}
            balance={pocket?.balance ?? 0}
            color={pocket?.color ?? gray[300]}
            icon={pocket?.icon ?? "pocket"}
            isLoading={isLoading || !pocket}
            sx={{
              backgroundColor: isLoading ? "transparent" : pocket?.color ?? "gray.main",
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
            minWidth={300}
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

      <Box sx={{ display: 'flex', justifyContent: "space-between", flexWrap: 'wrap', gap: 4 }}>
        <Box sx={{ flex: 2, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h6'>Grafik Keuanganmu</Typography>
          <ChartWithTabs
            isLoading={isStatsLoading}
            data={stats ?? []}
            sx={{ border: 1, padding: 4, borderRadius: 10, borderColor: "border.main" }}
            height={250}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h6'>Transaksi terakhir</Typography>
          <TransactionOverviewCard
            isLoading={isTransactionLoading || !last5Transactions.length}
            transactions={last5Transactions}
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
            transactions={transactions}
            isTransactionLoading={isTransactionLoading}
          />
          <BepInsightSection
            bep={bep}
            onChangeBepModal={handleChangeBepModal}
            pocket={selectedPocket}
            isLoading={isBepLoading}
            flex={1}
            display="flex"
            flexDirection="column"
            gap={4}
          />
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
        sx={{ mx: 4 }} defaultValue={pocket?.target_nominal ?? 0}
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
    <Box flex={1} display={"flex"} flexDirection="column" gap={4} {...props}>
      <DateRangeSelector onChange={handleDateRangeChange} mx={4} />
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
    const category = transaction.type;
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
      data: Object.entries(data).map(([category, { value, transactionCount }]) => ({
        label: category,
        value,
        color: getColorFromTransactionType(getTransactionCateogryFromString(category)),
        icon: <CustomIcon name={category} style={{ color: 'white', fontSize: 24 }} />,
        transactionCount,
      })),
    };
  });

  return result;
}
