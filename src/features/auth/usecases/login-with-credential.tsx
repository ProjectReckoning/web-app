import authRepository from "../repositories/repository";

export async function loginWithCredentialUseCase(phoneNumber: string, password: string): Promise<string> {
  if (!phoneNumber || !password) throw new Error("Email and password required");

  const result = await authRepository.login(phoneNumber, password)
  return result?.sessionId;
}