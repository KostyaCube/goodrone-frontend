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
