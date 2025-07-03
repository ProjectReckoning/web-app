import pocketRepository from "../repositories/pocket.repository";

interface EditPocketInput {
    name?: string;
    color?: string;
    icon?: string;
    targetNominal?: number;
}

export async function editPocketUsecase(
    pocketId: string,
    data: EditPocketInput
): Promise<{name: string; color: string; icon: string}> {
    const result = await pocketRepository.patchDetailPocket(pocketId, data);
    return result;
}

