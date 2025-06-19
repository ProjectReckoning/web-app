import { UserEntity } from "@/features/auth/entities/user.entities";
import pocketRepository from "../repositories/pocket.repository";
import { PocketEntity } from "../entities/pocket.entites";
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
