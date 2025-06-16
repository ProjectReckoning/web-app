import api from "@/lib/api";
import { PocketResponse, PocketResponseItem } from "../entities/pocket-response.entities";
import { Pocket } from "../entities/pocket.entites";

class PocketRepository {
  async getAllPocket(): Promise<Pocket[]> {
    const response = await api.get('/pocket')
    const responseData = response.data as PocketResponse
    const data = responseData.data
  
    return data.map((item: PocketResponseItem) => this.mapApiPocketToEntity(item))
  }

  private mapApiPocketToEntity(data: PocketResponseItem): Pocket {
    return ({
      id: data.pocket_id.toString(),
      name: data.name,
      type: data.type as Pocket['type'],
      target_nominal: parseFloat(data.target_nominal),
      current_balance: parseFloat(data.current_balance),
      deadline: data.deadline ? new Date(data.deadline) : null,
      status: data.status as Pocket['status'],
      icon: data.icon_name,
      color: data.color_hex,
      account_number: data.account_number,
      user_role: data.user_role as Pocket['user_role'],
    })
  }
}

const pocketRepository = new PocketRepository()

export default pocketRepository