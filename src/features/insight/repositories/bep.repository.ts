import api from "@/lib/api"
import { BepLoss } from "../entities/bep-loss.entities"
import { BepProfit } from "../entities/bep-profit.entities"
import { GetBepResponse } from "../entities/response/get-bep"

class BepRepository {
  async getBep(pocketId: string): Promise<BepProfit | BepLoss> {
    try {
      const response = await api.get(`/pocket/business/${pocketId}/bep`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data: GetBepResponse = await response.data
      
      if (data.data.status === 'profit') {
        return {
          status: 'profit',
          cleanProfit: data.data.cleanProfit,
          profitPercentage: data.data.profitPercentage * 100,
          averageDailyCleanProfit: data.data.averageDailyCleanProfit,
          estimatedDaysToBEP: data.data.estimatedDaysToBEP ?? 0,
        } as BepProfit
      } else {
        return {
          status: 'loss',
          loss: data.data.loss,
          averageDailyCleanProfit: data.data.averageDailyCleanProfit,
          projections: [this.getLowestDayProjection(data.data.projections)],
        } as BepLoss
      }

    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch BEP information')
    }
  }

  private getLowestDayProjection(projections: BepLoss['projections']) {
    return projections.reduce((lowest, projection) => {
      if (lowest.estimatedDaysToCoverLoss > projection.estimatedDaysToCoverLoss) {
        return projection
      }
      return lowest
    }, projections[0])
  }
}

const bepRepository = new BepRepository()

export default bepRepository