import bepRepository from "../repositories/bep.repository";
import { BepProfit } from "../entities/bep-profit.entities";
import { BepLoss } from "../entities/bep-loss.entities";

export async function getBep(pocketId: string): Promise<BepProfit | BepLoss> {
  const result = await bepRepository.getBep(pocketId);

  if (result.status === "profit") {
    result.profitPercentage = Math.round(result.profitPercentage * 10) / 10
  }

  return result;
}
