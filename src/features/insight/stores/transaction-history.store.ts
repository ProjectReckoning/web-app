import { create } from 'zustand'
import { TransactionEntity } from '@/features/insight/entities/transaction.entities';
import { get5LastTransactionsUsecase } from '../use-cases/get-last-5-transactions';
import { getAllTransaction } from '../use-cases/get-all-transactions';
import { TransactionSummaryEntity } from '@/features/insight/entities/transaction-summary.entities';
import { GetTransactionDurationOption } from '../constants/get-transaction-history-duration-option.enum';

type TransactionHistoryStore = {
  isLoading: boolean;
  errorMessage: string | null;
  transactions: TransactionEntity[] | null;
  allPocketsTransactions: TransactionEntity[] | null;
  last5Transactions: TransactionSummaryEntity[] | null;
  previousBalance: number | null;
  closingBalance: number | null;
  totalIncome: number | null;
  totalOutcome: number | null;

  getLast5Transactions: (pocketId?: string) => Promise<void>;
  getAllTransactions: ({
    pocketId,
    duration,
  }: {
    pocketId: string,
    duration: GetTransactionDurationOption,
  }) => Promise<void>
  getAllPocketsTransactions: ({
    pocketIds,
    duration,
  }: {
    pocketIds: string[],
    duration: GetTransactionDurationOption,
  }) => Promise<void>
};

const transactionHistoryStore = create<TransactionHistoryStore>((set) => ({
  isLoading: false,
  errorMessage: null,

  transactions: null,
  allPocketsTransactions: null,

  previousBalance: null,
  closingBalance: null,
  totalIncome: null,
  totalOutcome: null,
  last5Transactions: null,

  getLast5Transactions: async (pocketId?: string) => {
    set({
      isLoading: true,
      errorMessage: null,
      last5Transactions: null,
    })

    try {
      const transactionSummary = await get5LastTransactionsUsecase(pocketId)
      set({ last5Transactions: transactionSummary, errorMessage: null })
    } catch (error) {
      console.error(error)
      set({ errorMessage: error instanceof Error ? error.message : String(error) })
    } finally {
      set({ isLoading: false })
    }
  },

  getAllTransactions: async ({
    pocketId,
    duration,
  }: {
    pocketId: string,
    duration: GetTransactionDurationOption
  }) => {
    set({
      isLoading: true,
      errorMessage: null,
      transactions: null,
      previousBalance: null,
      closingBalance: null,
      totalIncome: null,
      totalOutcome: null,
    })

    try {
      const transactionOverview = await getAllTransaction({ pocketId, duration })
      set({
        transactions: transactionOverview.transactions,
        previousBalance: transactionOverview.previousBalance,
        closingBalance: transactionOverview.closingBalance,
        totalIncome: transactionOverview.totalIncome,
        totalOutcome: transactionOverview.totalOutcome,
        errorMessage: null,
      })
    } catch (error) {
      console.error(error)
      set({ errorMessage: error instanceof Error ? error.message : String(error) })
    } finally {
      set({ isLoading: false })
    }
  },

  getAllPocketsTransactions: async ({
    pocketIds,
    duration,
  }: {
    pocketIds: string[],
    duration: GetTransactionDurationOption,
  }): Promise<void> => {
    set({
      isLoading: true,
      errorMessage: null,
      allPocketsTransactions: null,
    })

    try {
      const promises = pocketIds.map((pocketId) => {
        return getAllTransaction({ pocketId, duration })
      })

      const transactionOverviews = await Promise.all(promises)
      const allTransactions = transactionOverviews.map((transactionOverview) => transactionOverview.transactions)
      const allPocketsTransactions = allTransactions.flat()
      set({ allPocketsTransactions, errorMessage: null })
    } catch (error) {
      console.error(error)
      set({ errorMessage: error instanceof Error ? error.message : String(error) })
    } finally {
      set({ isLoading: false })
    }
  },
}))

export default transactionHistoryStore