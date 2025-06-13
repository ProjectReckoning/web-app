import authRepository from "../repositories/repository";

export async function loginWithCredentialUseCase(phoneNumber: string, password: string): Promise<string> {
  if (!phoneNumber || !password) throw new Error("Email and password required");

  if (!phoneNumber.startsWith("+62")) {
    phoneNumber = "+62" + phoneNumber.replace(/\D+/g, '');
  }

  const result = await authRepository.login(phoneNumber, password)
  return result?.sessionId;
}