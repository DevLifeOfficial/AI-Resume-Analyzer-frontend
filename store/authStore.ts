import { create } from 'zustand';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
  setLoading: (v: boolean) => void;
}

// Hydrate from localStorage safely
const storedToken = (() => {
  try { return localStorage.getItem('auth_token'); } catch { return null; }
})();
const storedUser = (() => {
  try {
    const u = localStorage.getItem('auth_user');
    return u ? (JSON.parse(u) as AuthUser) : null;
  } catch { return null; }
})();

export const useAuthStore = create<AuthState>((set) => ({
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedToken && !!storedUser,
  isLoading: false,

  setAuth: (user, token) => {
    try {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
    } catch {}
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    } catch {}
    set({ user: null, token: null, isAuthenticated: false });
  },

  setLoading: (v) => set({ isLoading: v }),
}));