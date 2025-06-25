import { StatsItem } from "../entities/stats";
import statsRepository from "../repositories/stats.repository";

export async function getStats(pocketId?: string, type: "bulanan" | "tahunan" | "pemasukan" | "pengeluaran" = "bulanan"): Promise<StatsItem[]> {
  const result = await statsRepository.getStats(pocketId, type)
  return result
}
