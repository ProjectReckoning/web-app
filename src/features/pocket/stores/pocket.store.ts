import { create } from 'zustand'
import { getAllPocketsUsecase } from '../use-cases/get-all-pockets.usecase';
import { PocketEntity } from '../entities/pocket.entites';

type PocketStore = {
  pockets: PocketEntity[] | null;
  selectedPocket: PocketEntity | null;
  isLoading: boolean;
  errorMessage: string | null;
  getAllPockets: () => Promise<void>;
  selectPocket: (pocketId: string) => void;
};

const pocketStore = create<PocketStore>((set, get) => ({
  isLoading: false,
  errorMessage: null,
  pockets: [],
  selectedPocket: null,

  getAllPockets: async () => {
    try {
      set({
        isLoading: true,
        errorMessage: null,
        pockets: null,
      })
      const pockets = await getAllPocketsUsecase()
      set({ pockets })
    } catch (error) {
      set({ errorMessage: error instanceof Error ? error.message : String(error) })
    } finally {
      set({ isLoading: false })
    }
  },

  selectPocket: (pocketId: string) => {
    const pockets = get().pockets;

    const selectedPocket = pockets?.find(pocket => pocket.id === pocketId)
    if (selectedPocket) {
      set({ selectedPocket })
    }
  },
}))

export default pocketStore