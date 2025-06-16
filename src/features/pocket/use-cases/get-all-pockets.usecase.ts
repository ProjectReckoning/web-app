import { Pocket } from "../entities/pocket.entites";
import pocketRepository from "../repositories/pocket.repository";

export async function getAllPockets(): Promise<Pocket[]> {
  const result = await pocketRepository.getAllPocket()
  return result;
}