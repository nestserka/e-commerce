import { create } from 'zustand';

const local = localStorage.getItem('isAuth');
const localCustomerId = localStorage.getItem('customerId');
const refreshToken = localStorage.getItem('refreshToken');

interface LoginState {
  valueEmail: string;
  valuePassword: string;
  isAuth: boolean;
  customerId: string;
  customerRefreshToken: string;
  accessToken: string;
  createCustomerId: (data: string) => void;
  setAuthStatus: (status: boolean) => void;
  setRefreshToken: (data: string) => void;
  setAccessToken: (data: string) => void;
  setValueEmail: (email: string) => void;
  setValuePassword: (password: string) => void;
}

export const useLoginData = create<LoginState>((set) => ({
  valueEmail: '',
  valuePassword: '',
  isAuth: !!(local && local === 'true'),
  customerId: localCustomerId ?? '',
  customerRefreshToken: refreshToken ?? '',
  accessToken: '',
  createCustomerId: (data: string): void => {
    set(() => ({ customerId: data }));
  },
  setAuthStatus: (status: boolean): void => {
    set(() => ({ isAuth: status }));
  },
  setRefreshToken: (data: string): void => {
    set(() => ({ customerRefreshToken: data }));
  },
  setAccessToken: (data: string): void => {
    set(() => ({ accessToken: data }));
  },
  setValueEmail: (email: string): void => {
    set(() => ({ valueEmail: email }));
  },
  setValuePassword: (password: string): void => {
    set(() => ({ valuePassword: password }));
  },
}));
