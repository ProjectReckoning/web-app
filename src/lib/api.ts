import authStore from "@/features/auth/stores/auth.store";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`,
  // timeout: 5000,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = `Bearer ${authStore.getState().token}`;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
