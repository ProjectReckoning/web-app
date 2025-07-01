import { create } from 'zustand'
import { BepProfit } from '../entities/bep-profit.entities';
import { BepLoss } from '../entities/bep-loss.entities';
import { getBep } from '../use-cases/get-bep';

type BepStore = {
  isLoading: boolean;
  bep: BepProfit | BepLoss | null;
  errorMessage: string | null;

  getBep: (pocketId: string) => Promise<void>;
};

const bepStore = create<BepStore>((set) => ({
  isLoading: false,
  errorMessage: null,
  bep: null,

  getBep: async (pocketId: string) => {
    set({
      isLoading: true,
      errorMessage: null,
      bep: null,
    })

    try {
      const bep = await getBep(pocketId)
      set({ bep, errorMessage: null })
    } catch (error) {
      console.error(error)
      set({ errorMessage: error instanceof Error ? error.message : String(error) })
    } finally {
      set({ isLoading: false })
    }
  },
}))

export default bepStore