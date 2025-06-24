import { create } from "zustand";
import {
  DetailPocketEntity,
  PocketMember,
  PocketMemberRole,
} from "../entities/detail-pocket.entities";
import { getDetailPocketUsecase } from "../use-cases/get-detail-pockets.usecase copy";
import { editPocketUsecase } from "../use-cases/edit-pocket.usecase";
import { changePocketMemberRoleUseCase } from "../use-cases/change-role-member-pockets.usecase";

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
    targetNominal,
  }: {
    name?: string;
    color?: string;
    icon?: string;
    targetNominal?: number;
  }) => void;
  changePocketMemberRole: (
    userId: string,
    role: PocketMemberRole
  ) => Promise<void>;
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
    targetNominal,
  }: {
    name?: string;
    color?: string;
    icon?: string;
    targetNominal?: number;
  }) => {
    if (!get().pocket || !get().pocket?.id) {
      return set({ errorMessage: "Pocket not found or ID is missing" });
    }

    const pocketId = get().pocket?.id;

    if (!pocketId) {
      return set({ errorMessage: "Pocket ID is missing" });
    }
    
    const updatedPocket: Partial<DetailPocketEntity> = {
      name,
      color,
      icon,
      targetNominal,
    };

    editPocketUsecase(pocketId, updatedPocket)
      .then(() => {
        get().getDetailPocket(pocketId);
      })
      .catch((error) => {
        console.error(error);
        set({
          errorMessage: error instanceof Error ? error.message : String(error),
        });
      });
  },

  changePocketMemberRole: async (
    userId: string,
    role: PocketMemberRole
  ) => {
    const pocketId = get().pocket?.id;
    if (!pocketId) {
      return set({ errorMessage: "Pocket ID is missing" });
    }

    await changePocketMemberRoleUseCase(pocketId, userId, role)
    await get().getDetailPocket(pocketId);
  },
}));

export default detailPocketStore;
