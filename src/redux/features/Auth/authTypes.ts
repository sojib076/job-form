export interface User {
  _id?: string;
  name: string;
  email: string;
  role: "admin" | "user";
  token?: string;
}

export interface AuthState {
  _id: string | null; // This is the user ID, not the token
  user: User | null;
  loading: boolean;
  error: string | null;
}
