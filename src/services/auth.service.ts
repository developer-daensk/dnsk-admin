import {
  CodeRegisterType,
  CodeRegisterResponse,
  VerifyOTPRequestType,
  LoginResponse,
} from '../types/auth.types';
import api from './api';
import { handleApiError } from '../lib/errorHandler';

class AuthService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN_KEY);
  }

  async CodeRegister(data: CodeRegisterType): Promise<CodeRegisterResponse> {
    try {
      const response = await api.post<CodeRegisterResponse>('/auth/code/register', data);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }

  async Login(data: VerifyOTPRequestType): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/code/login', data);
      const { token } = response.data.data;
      this.setToken(token);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem(import.meta.env.VITE_ACCESS_TOKEN_KEY);
    this.token = null;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem(import.meta.env.VITE_ACCESS_TOKEN_KEY, token);
  }
}

export const authService = new AuthService();
