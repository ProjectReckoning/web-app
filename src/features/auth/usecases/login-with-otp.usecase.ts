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

  const formatedPhoneNumber = !phoneNumber.startsWith("62")
    ? "62" + phoneNumber.replace(/\D+/g, '')
    : phoneNumber.replace(/\D+/g, '');

  const result = await authRepository.oneTimePassword({
    sessionId,
    otp,
    phoneNumber: formatedPhoneNumber,
  });
  return result.token;
}
