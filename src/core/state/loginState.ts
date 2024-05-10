import { create } from 'zustand';

interface LoginState {
  valueEmail: string;
  valuePassword: string;
  setValueEmail: (email: string) => void;
  setValuePassword: (password: string) => void;
}

export const useLoginData = create<LoginState>((set) => ({
  valueEmail: '',
  valuePassword: '',
  setValueEmail: (email: string): void => {
    set(() => ({ valueEmail: email }));
  },
  setValuePassword: (password: string): void => {
    set(() => ({ valuePassword: password }));
  },
}));
