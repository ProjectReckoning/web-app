import authRepository from "../repositories/auth.repository";

export async function loginWithOtpUseCase({
  sessionId,
  otp,
  phoneNumber,
}: {
  sessionId: string;
  otp: string;
  phoneNumber: string;
}): Promise<string> {
  if (!sessionId || !otp) throw new Error("sesssionId and otp required");

  const result = await authRepository.oneTimePassword({
    sessionId,
    otp,
    phoneNumber,
  })
  return result.token;
}