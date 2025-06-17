import api from "@/lib/api";

class AuthRepository {
  async login(phoneNumber: string, password: string): Promise<{ phone_number: string, sessionId: string }> {
    const response = await api.post('/user/request-otp', {
      phone_number: phoneNumber,
      password
    })

    return response.data?.data
  }

  async oneTimePassword({
    sessionId,
    otp,
    phoneNumber
  }: {
    sessionId: string
    otp: string
    phoneNumber: string
  }): Promise<{ token: string }> {
    const response = await api.post('/user/verify-otp', {
      session_id: sessionId,
      otp,
      phone_number: phoneNumber
    })

    return response.data?.data
  }
}

const authRepository = new AuthRepository()

export default authRepository