import { create } from 'zustand';

import { LS_PREFIX } from '../../constants/constants';

import type { CustomerCredentials, IsShownModal, LoginState } from './types';

const localIsAuth = localStorage.getItem(`isAuth-${LS_PREFIX}`);
const localCustomerId = localStorage.getItem(`customerId-${LS_PREFIX}`);
const localRefreshToken = localStorage.getItem(`refreshToken-${LS_PREFIX}`);

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

export const showModalMessage = create<IsShownModal>((set) => ({
  isShown: false,
  setIsShown: (isShown: boolean): void => {
    set(() => ({ isShown }));
  },
}));
