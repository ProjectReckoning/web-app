import authRepository from "../repositories/auth.repository";

const EXPIRED_SESSION_TIME = 0.1 * 60 * 1000; // 3 minutes in milliseconds

export async function loginWithCredentialUseCase(phoneNumber: string, password: string): Promise<{ sessionId: string, expiresAt: Date }> {
  if (!phoneNumber || !password) throw new Error("Email and password required");

  const formatedPhoneNumber = !phoneNumber.startsWith("62")
    ? "62" + phoneNumber.replace(/\D+/g, '')
    : phoneNumber.replace(/\D+/g, '');

  const result = await authRepository.login(formatedPhoneNumber, password)
  const now = new Date();
  return {
    sessionId: result.sessionId,
    expiresAt:  new Date(now.getTime() + EXPIRED_SESSION_TIME)
  }
}