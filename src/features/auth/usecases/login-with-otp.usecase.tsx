import authRepository from "../repositories/auth.repository";

export async function loginWithOtpUseCase(sessionId: string, otp: string): Promise<string> {
  if (!sessionId || !otp) throw new Error("sesssionId and otp required");

  const result = await authRepository.oneTimePassword(sessionId, otp)
  return result.token;
}