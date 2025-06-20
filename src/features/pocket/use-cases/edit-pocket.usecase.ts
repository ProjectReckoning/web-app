import pocketRepository from "../repositories/pocket.repository";
import { DetailPocketEntity } from "../entities/detail-pocket.entities";

interface EditPocketInput {
    name?: string;
    color?: string;
    icon?: string;
}

export async function editPocketUsecase(
    pocketId: string,
    data: EditPocketInput
): Promise<DetailPocketEntity> {
    const result = await pocketRepository.editPocket(pocketId, data);
    return result;
}

