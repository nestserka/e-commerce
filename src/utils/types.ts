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

// export interface HttpError {
//   statusCode: number;
//   message: string;
//   errors?: { code: string; message: string }[];
//   error?: string;
//   error_description?: string;
// }

// export function isErrorType(value: unknown): value is HttpError {
//   return (
//     Boolean(value) &&
//     typeof value === 'object' &&
//     value !== null &&
//     'statusCode' in value &&
//     typeof (value as HttpError).statusCode === 'number' &&
//     'message' in value &&
//     typeof (value as HttpError).message === 'string' &&
//     ('errors' in value ? Array.isArray(value.errors) : true) &&
//     ('error' in value ? typeof (value as HttpError).error === 'string' : true) &&
//     ('error_description' in value ? typeof (value as HttpError).error_description === 'string' : true)
//   );
// }

// export function parseHttpError(text: string): HttpError | null {
//   const data = JSON.parse(text);

//   if (typeof data !== 'object' || data === null) {
//     console.warn("Invalid JSON format");

//     return null;
//   }

//   if (!('statusCode' in data) || typeof data.statusCode !== 'number') {
//     console.warn("Missing or invalid 'statusCode' property");

//     return null;
//   }

//   return {
//     statusCode: data.statusCode,
//     message: data.message || "",
//   };
// }
