export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

export interface UserState {
  user: User | null;
  token: string;
}

export type ISignin = {
  email: string;
  password: string;
  remember?: boolean;
};

export type ISignup = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
