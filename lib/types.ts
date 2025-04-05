export interface User {
  id: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
  user_metadata?: {
    avatar_url?: string;
    username?: string;
    [key: string]: any;
  };
}

export interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
} 