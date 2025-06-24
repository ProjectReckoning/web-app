import bepRepository from "../repositories/bep.repository";
import { BepProfit } from "../entities/bep-profit.entities";
import { BepLoss } from "../entities/bep-loss.entities";

export async function getBep(pocketId: string): Promise<BepProfit | BepLoss> {
  const result = await bepRepository.getBep(pocketId);
  return result;
}
