import { create } from 'zustand';

import { LS_PREFIX } from '../../constants/constants';

import type { Address } from '../../utils/types';
import type {
  CustomerCredentials,
  CustomerInfo,
  CustomerInfoState,
  IsShownModal,
  LoginState,
  ShowErrorMessage,
} from './types';

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
  reset: (): void => {
    set({
      valueEmail: '',
      valuePassword: '',
      isAuth: false,
      customerId: '',
      customerRefreshToken: '',
      accessToken: '',
    });
  },
}));

export const showModalMessage = create<IsShownModal>((set) => ({
  isShown: false,
  setIsShown: (isShown: boolean): void => {
    set(() => ({ isShown }));
  },
  isClipBoardShown: false,
  setIsClipShown: (isClipBoardShown: boolean): void => {
    set(() => ({ isClipBoardShown }));
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
  setUpdatedGeneraValues: (customerInfo: CustomerInfo): void => {
    set({
      firstName: customerInfo.firstName,
      lastName: customerInfo.lastName,
      dateOfBirth: customerInfo.dateOfBirth,
      version: customerInfo.version,
    });
  },
  updateAddress: (
    addressId: string,
    newAddress: Partial<Address>,
    version: number,
    addressType: 'shipping' | 'billing',
  ): void => {
    set((state) => ({
      ...state,
      [`${addressType}Address`]: state[`${addressType}Address`].map((address) =>
        address.id === addressId ? { ...address, ...newAddress } : address,
      ),
      version,
    }));
  },
  addAddress: (newAddress: Address, version: number, addressType: 'shipping' | 'billing', isDefault: boolean): void => {
    set((state) => {
      let updatedAddresses = state[`${addressType}Address`];

      if (isDefault) {
        updatedAddresses = updatedAddresses.map((address) => ({ ...address, isDefault: false }));
      }

      const addressWithDefault = { ...newAddress, isDefault };
      updatedAddresses.push(addressWithDefault);

      return {
        ...state,
        [`${addressType}Address`]: updatedAddresses,
        version,
      };
    });
  },
  removeAddress: (addressId: string, addressType: 'shipping' | 'billing', version: number): void => {
    set((state) => {
      const updatedAddresses = state[`${addressType}Address`].filter((address) => address.id !== addressId);

      return {
        ...state,
        [`${addressType}Address`]: updatedAddresses,
        version,
      };
    });
  },
  setDefault: (addressId: string, version: number, isDefault: boolean, addressType: 'shipping' | 'billing'): void => {
    set((state) => ({
      ...state,
      [`${addressType}Address`]: state[`${addressType}Address`].map((address) => ({
        ...address,
        isDefault: address.id === addressId ? isDefault : false,
      })),
      version,
    }));
  },
}));

export const showErrorMessage = create<ShowErrorMessage>((set) => ({
  isErrorShown: false,
  setErrorIsShown: (isErrorShown: boolean): void => {
    set(() => ({ isErrorShown }));
  },
}));
