import { create } from 'zustand';

import type { Address } from '../../utils/types';

type RegistrationStatus = 'idle' | 'inProgress' | 'userCreated' | 'registrationComplete' | 'error';

interface RegistrationState {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  addresses: Address[];
  status: RegistrationStatus;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setDateOfBirth: (dateOfBirth: string) => void;
  addAddress: (addresses: Address[]) => void;
  setStatus: (status: RegistrationStatus) => void;
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
  setStatus: (status: RegistrationStatus): void => {
    set(() => ({ status }));
  },
}));
