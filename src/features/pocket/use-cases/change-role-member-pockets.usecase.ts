import pocketRepository from "../repositories/pocket.repository";
import { PocketMemberRole } from "../entities/detail-pocket.entities";

export async function changePocketMemberRoleUseCase(
  pocketId: string,
  userId: string,
  role: PocketMemberRole
): Promise<{ message: string }> {
  const result = await pocketRepository.changePocketMemberRole(
    pocketId,
    userId,
    role
  );
  return result;
}
