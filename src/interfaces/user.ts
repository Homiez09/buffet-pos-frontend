export enum Role {
  MANAGER = "manager",
  EMPLOYEE = "employee",
}

export interface UserRegisterRequest {
  name: string; // required
  email: string; // required, must be a valid email
  password: string; // required
}

export interface UserLoginRequest {
  email: string; // required, must be a valid email
  password: string; // required
}

export interface UserLoginResponse {
  id: string;
  name: string;
  email: string;
  role: Role;
  token: string;
}

export interface UserRegisterResponse {
  message: string;
}
