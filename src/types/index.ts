
export * from './user';
export * from './post';
export * from './connection';

export interface Theme {
  mode: 'light' | 'dark';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: CreateUserData) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (userData: Partial<CreateUserData>) => Promise<void>;
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
