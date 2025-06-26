import api from "@/lib/api"
import { GetStatsResponse, GetStatsResponseItem } from "../entities/response/get-stats"
import { StatsItem } from "../entities/stats"

class StatsRepository {
  async getStats(pocketId?: string, type?: "bulanan" | "tahunan" | "pemasukan" | "pengeluaran" | "overview"): Promise<StatsItem[]> {
    const url = pocketId ? `/pocket/business/${pocketId}/stats?type=${type}` : `/pocket/business/stats?type=${type}`
    const response = await api.get<GetStatsResponse>(url)
    const { data } = response.data

    return data.map(this.mapStatsReponseToEntity)
  }

  private mapStatsReponseToEntity({ x, label, series }: GetStatsResponseItem): StatsItem {
    return { x, label, series }
  }
}

const statsRepository = new StatsRepository()

export default statsRepository