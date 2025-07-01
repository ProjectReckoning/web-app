import pocketRepository from "../repositories/pocket.repository";
import { PocketMemberRole } from "../entities/detail-pocket.entities";

export async function changePocketMemberRoleUseCase(
  pocketId: string,
  userId: string,
  role: PocketMemberRole
): Promise<{ message: string }> {
  let mappedRole = ""

  if (role === PocketMemberRole.Member) {
    mappedRole = "spender"
  } else {
    mappedRole = role
  }

  const result = await pocketRepository.changePocketMemberRole(
    pocketId,
    userId,
    mappedRole
  );
  return result;
}
