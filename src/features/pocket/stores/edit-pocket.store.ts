import { create } from "zustand";
import { DetailPocketEntity } from "../entities/detail-pocket.entities";

interface DetailPocketStore {
  pocket?: DetailPocketEntity;
  setPocket: (pocket: DetailPocketEntity) => void;
  updatePocket: (partial: Partial<DetailPocketEntity>) => void;
}

const detailPocketStore = create<DetailPocketStore>((set) => ({
  pocket: undefined,
  setPocket: (pocket) => set({ pocket }),
  updatePocket: (partial) =>
    set((state) => ({
      pocket: state.pocket ? { ...state.pocket, ...partial } : state.pocket,
    })),
}));

export default detailPocketStore;
