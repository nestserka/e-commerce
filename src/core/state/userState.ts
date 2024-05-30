import { create } from 'zustand';

import { LS_PREFIX } from '../../constants/constants';

import type { CustomerCredentials, CustomerInfo, CustomerInfoState, IsShownModal, LoginState } from './types';

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

export const useCustomerInfo = create<CustomerInfoState>((set) => ({
  valueEmail: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  shippingAddress: [],
  billingAddress: [],
  version: 1,
  isSet: false,
  setCustomerInfo: (customerInfo: CustomerInfo): void => {
    set({
      valueEmail: customerInfo.valueEmail,
      firstName: customerInfo.firstName,
      lastName: customerInfo.lastName,
      dateOfBirth: customerInfo.dateOfBirth,
      shippingAddress: customerInfo.shippingAddress,
      billingAddress: customerInfo.billingAddress,
      version: customerInfo.version,
      isSet: true,
    });
  },
  reset: (): void => {
    set({
      valueEmail: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      shippingAddress: [],
      billingAddress: [],
      version: 1,
      isSet: false,
    });
  },
  setUpdatedEmail: (customerInfo: CustomerInfo): void => {
    set({
      valueEmail: customerInfo.valueEmail,
      version: customerInfo.version,
    });
  },
  setValueVersion: (version: number): void => {
    set(() => ({ version }));
  },
}));
