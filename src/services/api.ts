import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { handleApiError } from '../lib/errorHandler';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  config => {
    const access_token = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN_KEY);
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  error => {
    handleApiError(error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here
    return response;
  },
  (error: AxiosError) => {
    handleApiError(error);
    return Promise.reject(error);
  }
);

export default api;
