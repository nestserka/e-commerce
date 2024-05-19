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
}
