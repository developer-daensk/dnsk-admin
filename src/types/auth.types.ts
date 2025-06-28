export interface CodeRegisterType {
  email: string;
}

export interface CodeRegisterResponse {
  message: string;
}

export interface VerifyOTPRequestType {
  email: string;
  code: string;
}

export interface UserData {
  token: string;
  refreshToken: string;
  email: string;
}

export interface LoginResponse {
  data: UserData;
}
