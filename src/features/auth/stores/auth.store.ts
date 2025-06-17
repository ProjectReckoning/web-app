import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { loginWithOtpUseCase } from '../usecases/login-with-otp.usecase';
import { loginWithCredentialUseCase } from '../usecases/login-with-credential.usecase';
import { AxiosError } from 'axios';

type AuthStore = {
	token: string | null;
	sessionId: string | null;
	sessionExpiresAt: Date | null;
	phoneNumber: string | null;
	isLoading: boolean;
	errorMessage: string | null;

	loginWithCredential: (phoneNumber: string, password: string) => Promise<void>;
	loginWithOtp: ({ sessionId, otp, phoneNumber }: { sessionId: string; otp: string; phoneNumber: string; }) => Promise<void>;
	logout: () => void;
};

const authStore = create<AuthStore>()(
	persist((set) => ({
		isLoading: false,
		errorMessage: null,
		sessionExpiresAt: null,
		phoneNumber: null,
		token: null,
		sessionId: null,

		loginWithCredential: async (phoneNumber: string, password: string) => {
			set({ isLoading: true })
			set({ errorMessage: null })
			try {
				const { sessionId, expiresAt } = await loginWithCredentialUseCase(phoneNumber, password)
				set({ sessionId, sessionExpiresAt: expiresAt, phoneNumber })
			} catch (error) {
				set({ errorMessage: error instanceof AxiosError ? error.response?.data.message : String(error) })
			} finally {
				set({ isLoading: false })
			}
		},

		loginWithOtp: async ({
			sessionId,
			otp,
			phoneNumber,
		}: {
			sessionId: string;
			otp: string;
			phoneNumber: string;
		}) => {
			set({ isLoading: true })
			set({ errorMessage: null })
			try {
				const token = await loginWithOtpUseCase({
					sessionId,
					otp,
					phoneNumber,
				})
				set({ token })
			} catch (error) {
				set({
					errorMessage: error instanceof AxiosError ? error.response?.data.message : String(error),
				})
			} finally {
				set({ isLoading: false })
			}
		},

		logout: () => {
			set({
				sessionId: null,
				token: null,
				sessionExpiresAt: null,
				phoneNumber: null,
				isLoading: false,
			});
		},
	}), {
		name: 'sessionId-store',
		storage: createJSONStorage(() => localStorage)
	}),
)

export default authStore