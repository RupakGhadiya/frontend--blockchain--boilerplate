import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
}

// change token location as per need 
export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  setToken: (token) => {
    localStorage.setItem('token', token || '');
    set({ token });
  },
  clearAuth: () => {
    localStorage.removeItem('token');
    set({ token: null });
  },
}));
