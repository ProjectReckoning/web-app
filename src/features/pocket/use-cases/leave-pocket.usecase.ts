import pocketRepository from "../repositories/pocket.repository";

export async function leavePocketUsecase(pocketId: string): Promise<void> {
    await pocketRepository.leavePocket(pocketId);
}

