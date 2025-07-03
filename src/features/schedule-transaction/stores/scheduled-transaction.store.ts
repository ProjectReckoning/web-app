import { create } from 'zustand'
import { ScheduledTransactionEntity } from '../entities/scheduled-transaction.entity';
import { getAllScheduledTransactions } from '../use-cases/get-all-scheduled-transactions.usecase';

type ScheduledTransactionStore = {
  scheduledTransactions: ScheduledTransactionEntity[];
  isLoading: boolean;
  errorMessage: string | null;
  getAllScheduledTransactions: (pocketId: string) => Promise<void>;
};

const scheduledTransactionsStore = create<ScheduledTransactionStore>((set) => ({
  isLoading: false,
  errorMessage: null,
  scheduledTransactions: [],

  getAllScheduledTransactions: async (pocketId: string) => {
    try {
      set({
        isLoading: true,
        errorMessage: null,
        scheduledTransactions: [],
      })
      const pockets = await getAllScheduledTransactions(pocketId)
      set({ scheduledTransactions: pockets })
    } catch (error) {
      set({ errorMessage: error instanceof Error ? error.message : String(error) })
    } finally {
      set({ isLoading: false })
    }
  },
}))

export default scheduledTransactionsStore