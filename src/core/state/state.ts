import { create } from 'zustand';

const local = localStorage.getItem('isAuth');
const localCustomerId = localStorage.getItem('customerId');
const refreshToken = localStorage.getItem('refreshToken');
export interface UserState {
  isAuth: boolean;
  customerId: string;
  customerRefreshToken: string;
  accessToken: string;
  createCustomerId: (data: string) => void;
  setAuthStatus: (status: boolean) => void;
  setRefreshToken: (data: string) => void;
  setAccessToken: (data: string) => void;
}

export const useUserData = create<UserState>((set) => ({
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
}));
