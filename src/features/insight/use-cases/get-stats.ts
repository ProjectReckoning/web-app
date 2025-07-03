import { StatsItem } from "../entities/stats";
import statsRepository from "../repositories/stats.repository";

export async function getStats(pocketId?: string, type: "bulanan" | "tahunan" | "pemasukan" | "pengeluaran" | "overview" = "bulanan"): Promise<StatsItem[]> {
  const result = await statsRepository.getStats(pocketId, type)
  const mappedResult = result.map((item) => ({
    ...item,
    label: type
  }))

  return mappedResult
}
