import { create } from 'zustand';

import { LS_PREFIX } from '../../constants/constants';

const localIsAuth = localStorage.getItem(`isAuth-${LS_PREFIX}`);
const localCustomerId = localStorage.getItem(`customerId-${LS_PREFIX}`);
const localRefreshToken = localStorage.getItem(`refreshToken-${LS_PREFIX}`);

interface CustomerCredentials {
  valueEmail: string;
  valuePassword: string;
  isAuth: boolean;
  customerId: string;
}

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
  setCustomerCredentials: (customerCredentials: CustomerCredentials) => void;
}

export const useLoginData = create<LoginState>((set) => ({
  valueEmail: '',
  valuePassword: '',
  isAuth: !!(localIsAuth && localIsAuth === 'true'),
  customerId: localCustomerId ?? '',
  customerRefreshToken: localRefreshToken ?? '',
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
  setCustomerCredentials: (customerCredentials: CustomerCredentials): void => {
    const { customerId, isAuth, valuePassword, valueEmail } = customerCredentials;
    set(() => ({
      customerId,
      isAuth,
      valuePassword,
      valueEmail,
    }));
  },
}));
