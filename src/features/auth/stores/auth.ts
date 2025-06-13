import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { loginWithOtpUseCase } from '../usecases/login-with-otp';
import { loginWithCredentialUseCase } from '../usecases/login-with-credential';
import { AxiosError } from 'axios';

type AuthStore = {
	token: string | null;
	sessionId: string | null;
	isLoading: boolean;
	errorMessage: string | null;
	loginWithCredential: (phoneNumber: string, password: string) => Promise<void>;
	loginWithOtp: (sessionId: string, otp: string) => Promise<void>;
	logout: () => void;
};

const authStore = create<AuthStore>()(
	persist((set) => ({
		isLoading: false,
		errorMessage: null,
		token: null,
		sessionId: null,

		loginWithCredential: async (phoneNumber: string, password: string) => {
			set({ isLoading: true })
			set({ errorMessage: null })
			try {
				const sessionId = await loginWithCredentialUseCase(phoneNumber, password)
				set({ sessionId: sessionId })
			} catch (error) {
				set({ errorMessage: error instanceof AxiosError ? error.response?.data.message : String(error) })
			} finally {
				set({ isLoading: false })
			}
		},

		loginWithOtp: async (sessionId: string, otp: string) => {
			set({ isLoading: true })
			set({ errorMessage: null })
			try {
				const token = await loginWithOtpUseCase(sessionId, otp)
				set({ token })
			} catch (error) {
				console.error(error)
			} finally {
				set({ isLoading: false })
			}
		},

		logout: () => {
			set({ sessionId: null });
			set({ token: null });
		},
	}), {
		name: 'sessionId-store',
		storage: createJSONStorage(() => localStorage)
	}),
)

export default authStore