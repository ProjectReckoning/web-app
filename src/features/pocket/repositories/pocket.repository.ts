import api from "@/lib/api";
import { PocketEntity } from "../entities/pocket.entites";
import { PocketResponse, PocketResponseItem } from "../entities/get-pocket-response.entities";
import { DetailPocketEntity, PocketMemberRole } from "../entities/detail-pocket.entities";
import { GetPocketDetailResponse, PocketDetailResponseItem as PocketDetailResponseItem } from "../entities/get-pocket-detail-response";

class PocketRepository {
  async getAllPocket(): Promise<PocketEntity[]> {
    try {
      const response = await api.get('/pocket')
      const responseData = response.data as PocketResponse
      const data = responseData.data
  
      return data.map((item: PocketResponseItem) => this.mapApiPocketToEntity(item))
    } catch (error) {
      console.error("Error fetching pockets:", error)
      throw new Error("Failed to fetch pockets")
    }
  }

  async getDetailPocket(pocketId: string): Promise<DetailPocketEntity> {
    const response = await api.get(`/pocket/${pocketId}`)
    const responseData = response.data as GetPocketDetailResponse
    const data = responseData.data

    if (!data) {
      throw new Error(`Pocket with ID ${pocketId} not found`)
    }

    return this.mapApiPocketDetailToEntity(data)
  }

  async changePocketMemberRole(pocketId: string, userId: string, role: string): Promise<{ message: string}>{
    const response = await api.patch(`/pocket/${pocketId}/members/${userId}/role`, {
      role
    })
    const responseData = response.data as { message: string }
    
    return responseData
  }

  private mapApiPocketToEntity(data: PocketResponseItem): PocketEntity {
    return ({
      id: data.pocket_id.toString(),
      name: data.name,
      type: data.type as PocketEntity['type'],
      target_nominal: parseFloat(data.target_nominal),
      current_balance: parseFloat(data.current_balance),
      deadline: data.deadline ? new Date(data.deadline) : null,
      status: data.status as PocketEntity['status'],
      icon: data.icon_name,
      color: data.color_hex,
      account_number: data.account_number,
      user_role: data.user_role as PocketEntity['user_role'],
      income: data.income,
      outcome: data.outcome,
    })
  }

  private mapApiPocketDetailToEntity(data: PocketDetailResponseItem): DetailPocketEntity {
    return {
      id: data.id.toString(),
      name: data.name,
      type: data.type,
      targetNominal: data.target_nominal,
      balance: data.current_balance,
      deadline: data.deadline ? new Date(data.deadline) : null,
      status: data.status,
      icon: data.icon_name,
      color: data.color_hex,
      accountNumber: data.account_number,
      ownerUserId: data.owner_user_id,
      income: data.income,
      outcome: data.outcome,
      owner: {
        id: data.owner.id,
        name: data.owner.name,
        phoneNumber: data.owner.phone_number,
        metadata: {
          id: data.owner.PocketMember.id,
          userId: data.owner.PocketMember.user_id,
          pocketId: data.owner.PocketMember.pocket_id,
          role: this.mapApiPocketMemberRole(data.owner.PocketMember.role),
          contributionAmount: data.owner.PocketMember.contribution_amount,
          joinedAt: data.owner.PocketMember.joined_at ?? null,
          isActive: data.owner.PocketMember.is_active ?? null,
          createdAt: data.owner.PocketMember.createdAt,
          updatedAt: data.owner.PocketMember.updatedAt,
        }
      },
      members: data.members.map(member => ({
        id: member.id,
        name: member.name,
        phoneNumber: member.phone_number,
        metadata: {
          id: member.PocketMember.id,
          userId: member.PocketMember.user_id,
          pocketId: member.PocketMember.pocket_id,
          role: this.mapApiPocketMemberRole(member.PocketMember.role),
          contributionAmount: member.PocketMember.contribution_amount,
          joinedAt: member.PocketMember.joined_at ?? null,
          isActive: member.PocketMember.is_active ?? null,
          createdAt: member.PocketMember.createdAt,
          updatedAt: member.PocketMember.updatedAt,
        }
      })),
      userRole: data.user_role ? this.mapApiPocketMemberRole(data.user_role) : PocketMemberRole.Member,
    };
  }

  private mapApiPocketMemberRole(role: string): PocketMemberRole {
    switch (role) {
      case "owner":
        return PocketMemberRole.Owner
      case "admin":
        return PocketMemberRole.Admin
      case "viewer":
        return PocketMemberRole.Member
      default:
        throw new Error(`Unknown role: ${role}`);
    }
  }

}

const pocketRepository = new PocketRepository()

export default pocketRepository