import type { Address } from '../../utils/types';

export interface CustomerCredentials {
  valueEmail: string;
  valuePassword: string;
  isAuth: boolean;
  customerId: string;
}

export interface LoginState {
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
  reset: () => void;
}

export interface IsShownModal {
  isShown: boolean;
  setIsShown: (isSHown: boolean) => void;
}

export interface CustomerInfo {
  valueEmail?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  shippingAddress?: Address[];
  billingAddress?: Address[];
  version?: number;
}

export interface CustomerInfoState {
  valueEmail: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shippingAddress: Address[];
  billingAddress: Address[];
  version: number;
  isSet: boolean;
  setCustomerInfo: (customerInfo: CustomerInfo) => void;
  reset: () => void;
  setUpdatedEmail: (customerInfo: CustomerInfo) => void;
  setValueVersion: (version: number) => void;
  setUpdatedGeneraValues: (customerInfo: CustomerInfo) => void;
  updateAddress: (
    addressId: string,
    newAddress: Partial<Address>,
    version: number,
    addressType: 'shipping' | 'billing',
  ) => void;
  setDefault: (addressId: string, version: number, isDefault: boolean, addressType: 'shipping' | 'billing') => void;
  addAddress: (newAddress: Address, version: number, addressType: 'shipping' | 'billing', isDefault: boolean) => void;
  removeAddress: (addressId: string, addressType: 'shipping' | 'billing', version: number) => void;
}
