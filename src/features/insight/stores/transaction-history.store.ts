import { create } from 'zustand'
import { TransactionEntity } from '@/features/insight/entities/transaction.entities';
import { get5LastTransactionsUsecase } from '../use-cases/get-last-5-transactions';
import { getAllTransaction } from '../use-cases/get-all-transactions';
import { GetTransactionDurationOption } from '../constants/req/get-transaction-history-duration-option.enum';
import { TransactionSummaryEntity } from '@/features/insight/entities/transaction-summary.entities';

type TransactionHistoryStore = {
  isLoading: boolean;
  errorMessage: string | null;
  transactions: TransactionEntity[];
  transactionSummary: TransactionSummaryEntity[];
  previousBalance: number | null;
  closingBalance: number | null;
  totalIncome: number | null;
  totalOutcome: number | null;

  getLast5Transactions: (pocketId: string) => void;
  getAllTransactions: (pocketId: string, duration: GetTransactionDurationOption) => void;
};

const transactionHistoryStore = create<TransactionHistoryStore>((set) => ({
  isLoading: false,
  errorMessage: null,
  transactions: [],
  previousBalance: null,
  closingBalance: null,
  totalIncome: null,
  totalOutcome: null,
  transactionSummary: [],

  getLast5Transactions: async (pocketId: string) => {
    set({ isLoading: true, errorMessage: null })

    try {
      const transactionSummary = await get5LastTransactionsUsecase(pocketId)
      set({ transactionSummary, errorMessage: null })
    } catch (error) {
      console.error(error)
      set({ errorMessage: error instanceof Error ? error.message : String(error) })
    } finally {
      set({ isLoading: false })
    }
  },

  getAllTransactions: async (pocketId: string, duration: GetTransactionDurationOption) => {
    set({ isLoading: true, errorMessage: null })

    try {
      const transactionOverview = await getAllTransaction(pocketId, duration)
      set({
        transactions: transactionOverview.transactions,
        previousBalance: transactionOverview.previousBalance,
        closingBalance: transactionOverview.closingBalance,
        totalIncome: transactionOverview.totalIncome,
        totalOutcome: transactionOverview.totalOutcome,
        errorMessage: null })
    } catch (error) {
      console.error(error)
      set({ errorMessage: error instanceof Error ? error.message : String(error) })
    } finally {
      set({ isLoading: false })
    }
  },
}))

export default transactionHistoryStore