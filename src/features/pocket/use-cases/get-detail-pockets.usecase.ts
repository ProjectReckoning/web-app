import { POCKET_ICON_OPTIONS } from "../constants/pocket-icon-option.constant";
import { DetailPocketEntity } from "../entities/detail-pocket.entities";
import pocketRepository from "../repositories/pocket.repository";

export async function getDetailPocketUsecase(pocketId: string): Promise<DetailPocketEntity> {
  const result = await pocketRepository.getDetailPocket(pocketId)

  const isIconInsideContract = POCKET_ICON_OPTIONS.includes(result.icon)

  if (!isIconInsideContract) {
    result.icon = "pocket"
  }

  return result;
}