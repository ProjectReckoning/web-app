import pocketRepository from "../repositories/pocket.repository";

interface EditPocketInput {
    name?: string;
    color?: string;
    icon?: string;
}

export async function editPocketUsecase(
    pocketId: string,
    data: EditPocketInput
): Promise<{name: string; color: string; icon: string}> {
    const result = await pocketRepository.editPocket(pocketId, data);
    return result;
}

