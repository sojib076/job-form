export interface User {
  name: string;
  email: string;
  role: "admin" | "user";
  token?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
