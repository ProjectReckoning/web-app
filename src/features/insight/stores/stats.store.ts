import { create } from 'zustand'
import { StatsItem } from '../entities/stats';
import { getStats } from '../use-cases/get-stats';

type StatsStore = {
  isLoading: boolean;
  stats: StatsItem[] | null;
  errorMessage: string | null;

  getStatsGlobalPocket: () => Promise<void>;
  getStatsSpesificPocket: (pocketId: string) => Promise<void>;
};

const statsStore = create<StatsStore>((set) => ({
  isLoading: false,
  errorMessage: null,
  stats: null,

  getStatsGlobalPocket: async () => {
    set({
      isLoading: true,
      errorMessage: null,
      stats: null,
    })

    try {
      const [incomeStats, outcomeStats, overview] = await Promise.all([
        getStats(undefined, "pemasukan"),
        getStats(undefined, "pengeluaran"),
        getStats(undefined, "overview"),
      ])
      set({ stats: [...overview, ...incomeStats, ...outcomeStats], errorMessage: null })
    } catch (error) {
      console.error(error)
      set({ errorMessage: error instanceof Error ? error.message : String(error) })
    } finally {
      set({ isLoading: false })
    }
  },

  getStatsSpesificPocket: async (pocketId: string) => {
    set({
      isLoading: true,
      errorMessage: null,
      stats: null,
    })

    try {
      const [monthlyStats, yearlyStats] = await Promise.all([
        getStats(pocketId, "bulanan"),
        getStats(pocketId, "tahunan"),
      ])
      set({ stats: [...monthlyStats, ...yearlyStats], errorMessage: null })
    } catch (error) {
      console.error(error)
      set({ errorMessage: error instanceof Error ? error.message : String(error) })
    } finally {
      set({ isLoading: false })
    }
  },
}))

export default statsStore