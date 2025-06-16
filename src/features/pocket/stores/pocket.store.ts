import { create } from 'zustand'
import { getAllPockets } from '../use-cases/get-all-pockets.usecase';
import { Pocket } from '../entities/pocket.entites';

type PocketStore = {
  pockets: Pocket[];
  selectedPocket: Pocket | null;
  isLoading: boolean;
  errorMessage: string | null;
  getAllPockets: () => Promise<void>;
  selectPocket: (pocketId?: string) => void;
};

const pocketStore = create<PocketStore>((set, get) => ({
  isLoading: false,
  errorMessage: null,
  pockets: [],
  selectedPocket: null,

  getAllPockets: async () => {
    set({ isLoading: true })
    set({ errorMessage: null })
    try {
      const pockets = await getAllPockets()
      set({ pockets })
    } catch (error) {
      console.error(error)
    } finally {
      set({ isLoading: false })
    }
  },

  selectPocket: (pocketId?: string) => {
    const pockets = get().pockets;
  
    if (!pocketId) {
      set({ selectedPocket: pockets[0] })
      return
    }

    const selectedPocket = pockets.find(pocket => pocket.id === pocketId)
    if (selectedPocket) {
      set({ selectedPocket })
    }
  }
}))

export default pocketStore