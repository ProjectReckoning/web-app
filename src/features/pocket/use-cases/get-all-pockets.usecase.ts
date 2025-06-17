import { PocketEntity } from "../entities/pocket.entites";
import pocketRepository from "../repositories/pocket.repository";

export async function getAllPocketsUsecase(): Promise<PocketEntity[]> {
  const result = await pocketRepository.getAllPocket()
  return result;
}