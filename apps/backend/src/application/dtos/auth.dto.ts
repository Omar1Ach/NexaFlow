export interface LoginInputDTO {
  email: string;
  password: string;
}

export interface RegisterInputDTO {
  email: string;
  password: string;
  name: string;
  role?: 'ADMIN' | 'USER';
}

export interface AuthUserDTO {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
}

export interface LoginOutputDTO {
  token: string;
  user: AuthUserDTO;
}

export interface RegisterOutputDTO {
  user: AuthUserDTO;
}
