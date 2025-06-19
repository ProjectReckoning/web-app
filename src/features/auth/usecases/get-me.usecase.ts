import { UserEntity } from "../entities/user.entities";
import authRepository from "../repositories/auth.repository";

export const getMeUseCase = async (): Promise<UserEntity> => {
  const response = await authRepository.me();
  return {
    id: response.id,
    name: response.name,
    phoneNumber: response.phoneNumber,
  };
};
