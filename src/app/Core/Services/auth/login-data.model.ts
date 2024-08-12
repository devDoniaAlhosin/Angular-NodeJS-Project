export interface LoginResponse {
  status: string;
  data: any;
  token: string;
  userId: string;
  username: string;
}

export interface LoginError {
  message: string;
}

export interface LoginData {
  username: string;
  password: string;
  rememberMe: boolean;
}
