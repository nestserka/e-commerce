import type { TokenStore } from '@commercetools/sdk-client-v2';

export interface InputProps {
  type: string;
  id: string;
  placeholder: string;
  autoComplete: string;
}

export interface Address {
  id?: string;
  streetName?: string;
  city?: string;
  postalCode?: string;
  country: string;
  isDefault?: boolean;
}

export function isTokenStore(obj: unknown): obj is TokenStore {
  return Boolean(obj) && typeof obj === 'object' && obj !== null && 'token' in obj && 'expirationTime' in obj;
}

export interface FormModal {
  isOpen: boolean;
  onClose: () => void;
}
