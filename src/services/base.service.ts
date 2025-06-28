import { API_BASE_URL } from '../lib/constants';
import { getAuthToken } from '../lib/utils';
import { ApiError, ApiResponse } from '../types';

export class BaseService {
  protected baseUrl: string;

  constructor(endpoint: string) {
    this.baseUrl = `${API_BASE_URL}${endpoint}`;
  }

  protected async request<T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'An error occurred',
        code: 'API_ERROR',
        status: 500,
      };
      throw apiError;
    }
  }

  protected async get<T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  protected async post<T>(
    url: string,
    data: unknown,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  protected async put<T>(
    url: string,
    data: unknown,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  protected async delete<T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }
}
