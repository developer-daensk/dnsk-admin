// Common types used across the application
export interface User {
  id: string;
  email: string;
  role: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

// Auth Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

// Re-export user management types
export * from './user-managment.types';

// Re-export common component types
export * from './common.types';
