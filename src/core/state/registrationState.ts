import { create } from 'zustand';

import { apiRoot } from '../../api/AdminBuilder';

import type { Address } from '../../utils/types';
import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';

export interface RegistrationState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setDateOfBirth: (dateOfBirth: string) => void;
  addAddress: (addresses: Address[]) => void;
  setDefaultShippingAddress: (defaultShippingAddress: number) => void;
  setDefaultBillingAddress: (defaultBillingAddress: number) => void;
  createCustomer: (data: RegistrationState) => Promise<ClientResponse<CustomerSignInResult>>;
}

export const useRegistrationData = create<RegistrationState>((set) => ({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  addresses: [],
  status: 'idle',
  setEmail: (email: string): void => {
    set(() => ({ email }));
  },
  setFirstName: (firstName: string): void => {
    set(() => ({ firstName }));
  },
  setLastName: (lastName: string): void => {
    set(() => ({ lastName }));
  },
  setPassword: (password: string): void => {
    set(() => ({ password }));
  },
  setDateOfBirth: (dateOfBirth: string): void => {
    set(() => ({ dateOfBirth }));
  },
  addAddress: (addresses: Address[]): void => {
    set((state) => ({ ...state, addresses: [...state.addresses, ...addresses] }));
  },
  setDefaultShippingAddress: (defaultShippingAddress: number): void => {
    set(() => ({ defaultShippingAddress }));
  },
  setDefaultBillingAddress: (defaultBillingAddress: number): void => {
    set(() => ({ defaultBillingAddress }));
  },
  createCustomer: async (data: RegistrationState): Promise<ClientResponse<CustomerSignInResult>> => {
    const { email, firstName, lastName, password, addresses, defaultShippingAddress, defaultBillingAddress } = data;
    const customer = await apiRoot
      .customers()
      .post({
        body: {
          email,
          firstName,
          lastName,
          password,
          addresses,
          ...(defaultShippingAddress !== undefined && { defaultShippingAddress }),
          ...(defaultBillingAddress !== undefined && { defaultBillingAddress }),
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();

    return customer;
  },
}));
