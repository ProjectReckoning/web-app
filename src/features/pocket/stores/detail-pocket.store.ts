import { create } from 'zustand'
import { DetailPocketEntity, PocketMember, PocketMemberRole } from '../entities/detail-pocket.entities';
import { getDetailPocketUsecase } from '../use-cases/get-detail-pockets.usecase copy';

type DetailPocketStore = {
  pocket: DetailPocketEntity | null;
  isLoading: boolean;
  errorMessage: string | null;
  getDetailPocket: (pocketId: string) => Promise<void>;
  getAllMembers: (role: PocketMemberRole) => PocketMember[];
};

const detailPocketStore = create<DetailPocketStore>((set, get) => ({
  isLoading: false,
  errorMessage: null,
  pocket: null,

  getDetailPocket: async (pocketId: string) => {
    set({ isLoading: true, errorMessage: null })

    try {
      const pocket = await getDetailPocketUsecase(pocketId)
      set({ pocket, errorMessage: null })
    } catch (error) {
      console.error(error)
      set({ errorMessage: error instanceof Error ? error.message : String(error) })
    } finally {
      set({ isLoading: false })
    }
  },

  getAllMembers: (role: PocketMemberRole): PocketMember[] => {
    const pocket = get().pocket;
    if (!pocket) return [];

    const owner = pocket.owner;

    if (role === PocketMemberRole.Owner) {
      return [owner];
    }

    return pocket.members.filter((member: PocketMember) => member.metadata?.role === role);
  }
}))

export default detailPocketStore