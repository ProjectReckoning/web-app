import api from "@/lib/api";

class AuthRepository {
  async login(phoneNumber: string, password: string): Promise<{ sessionId: string }> {
    const response = await api.post('/user/login', {
      phone_number: phoneNumber,
      password
    })

    return response.data?.data
  }

  async oneTimePassword(sessionId: string, otp: string): Promise<{ token: string }> {
    const response = await api.post('/user/login', {
      session_id: sessionId,
      otp
    })

    return response.data?.data
  }
}

const authRepository = new AuthRepository()

export default authRepository