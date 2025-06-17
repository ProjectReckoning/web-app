import { DetailPocketEntity } from "../entities/detail-pocket.entities";
import pocketRepository from "../repositories/pocket.repository";

export async function getDetailPocketUsecase(pocketId: string): Promise<DetailPocketEntity> {
  const result = await pocketRepository.getDetailPocket(pocketId)
  return result;
}