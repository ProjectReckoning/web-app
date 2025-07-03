import { POCKET_ICON_OPTIONS } from "../constants/pocket-icon-option.constant";
import { PocketEntity } from "../entities/pocket.entites";
import pocketRepository from "../repositories/pocket.repository";

export async function getAllPocketsUsecase(): Promise<PocketEntity[]> {
  const result = await pocketRepository.getAllPocket()

  const mappedResult = result.map((it) => {
    const isIconInsideContract = POCKET_ICON_OPTIONS.includes(it.icon)

    return ({
      ...it,
      icon: isIconInsideContract ? it.icon : "pocket"
    })
  })

  return mappedResult;
}