import type { MiddlewareRequest, TokenInfo, TokenStore, requestBaseOptions } from '@commercetools/sdk-client-v2';

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

export function isTokenInfo(obj: unknown): obj is TokenInfo {
  return (
    Boolean(obj) &&
    typeof obj === 'object' &&
    obj !== null &&
    'access_token' in obj &&
    'scope' in obj &&
    'token_type' in obj &&
    'expires_in' in obj
  );
}

export interface FormModal {
  isOpen: boolean;
  onClose: () => void;
  billingAddressId?: string;
  shippingAddressId?: string;
  addressId?: string;
  addressType?: 'shipping' | 'billing';
}

export const VERSION_ERROR_MESSAGE: string =
  'Sorry, but we were unable to save your changes as someone else made changes to this same source while you were editing. Please refresh the page and re-enter your changes.';

export type Fetcher = (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response>;

export type ExecuteRequestOptions = requestBaseOptions & {
  fetcher: Fetcher;
};

export type AuthMiddlewareBaseOptions = requestBaseOptions & {
  request: MiddlewareRequest;
  fetch: Fetcher;
};

export interface HttpError {
  statusCode: number;
  message: string;
  errors?: { code: string; message: string }[];
  error?: string;
}

export function isErrorType(value: unknown): value is HttpError {
  return (
    Boolean(value) &&
    typeof value === 'object' &&
    value !== null &&
    'statusCode' in value &&
    'message' in value &&
    'error' in value
  );
}

export interface AttributeBestseller {
  name: 'bestseller';
  value: boolean[];
}

export interface AttributeDiscount {
  name: 'discount';
  value: Discount[];
}

export interface Discount {
  key: string;
  label: string;
}

export interface CartItemLineProps {
  id: string;
  imageUrl: string;
  productName: string;
  discountedPricePerItem: string | undefined;
  discountLabel: string;
  pricePerItem: string;
  quantity: number;
  totalPrice: string;
  productId: string;
}
