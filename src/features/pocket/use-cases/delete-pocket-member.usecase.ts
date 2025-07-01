import pocketRepository from "../repositories/pocket.repository";

export async function deleteMemberPocketUsecase(
    pocketId: string,
    userId: string
): Promise<void> {
    await pocketRepository.deleteMember(pocketId, userId);
}

