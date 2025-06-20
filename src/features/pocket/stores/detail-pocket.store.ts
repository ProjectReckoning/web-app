import { create } from "zustand";
import {
  DetailPocketEntity,
  PocketMember,
  PocketMemberRole,
} from "../entities/detail-pocket.entities";
import { getDetailPocketUsecase } from "../use-cases/get-detail-pockets.usecase copy";
import { editPocketUsecase } from "../use-cases/edit-pocket.usecase";

type DetailPocketStore = {
  pocket: DetailPocketEntity | null;
  isLoading: boolean;
  errorMessage: string | null;
  getDetailPocket: (pocketId: string) => Promise<void>;
  getAllMembers: (role: PocketMemberRole) => PocketMember[];
  updatePocket: ({
    name,
    color,
    icon,
  }: {
    name: string;
    color: string;
    icon: string;
  }) => void;
};

const detailPocketStore = create<DetailPocketStore>((set, get) => ({
  isLoading: false,
  errorMessage: null,
  pocket: null,

  getDetailPocket: async (pocketId: string) => {
    set({ isLoading: true, errorMessage: null });

    try {
      const pocket = await getDetailPocketUsecase(pocketId);
      set({ pocket, errorMessage: null });
    } catch (error) {
      console.error(error);
      set({
        errorMessage: error instanceof Error ? error.message : String(error),
      });
    } finally {
      set({ isLoading: false });
    }
  },

  getAllMembers: (role: PocketMemberRole): PocketMember[] => {
    const pocket = get().pocket;
    if (!pocket) return [];

    const owner = pocket.owner;

    if (role === PocketMemberRole.Owner) {
      return [owner];
    }

    return pocket.members.filter(
      (member: PocketMember) => member.metadata?.role === role
    );
  },

  updatePocket: ({
    name,
    color,
    icon,
  }: {
    name: string;
    color: string;
    icon: string;
  }) => {
    if (!get().pocket || !get().pocket?.id) {
      return set({ errorMessage: "Pocket not found or ID is missing" });
    }

    editPocketUsecase(get().pocket?.id || "", { name, color, icon })
      .then((updatedPocket) => {
        set((state) => ({
          pocket: state.pocket
            ? { ...state.pocket, ...updatedPocket }
            : state.pocket,
        }));
      })
      .catch((error) => {
        console.error("Failed to update pocket:", error);
        set({
          errorMessage: error instanceof Error ? error.message : String(error),
        });
      });
  },
}));

export default detailPocketStore;
