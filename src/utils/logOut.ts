import { tokenCache } from '../api/token/MyTokenCache';
import { LS_PREFIX } from '../constants/constants';
import { useCustomerInfo, useLoginData } from '../core/state/userState';

export function logOut(): void {
  useCustomerInfo.getState().reset();
  useLoginData.getState().reset();
  localStorage.removeItem(`isAuth-${LS_PREFIX}`);
  localStorage.removeItem(`customerId-${LS_PREFIX}`);
  localStorage.removeItem(`customerCart-${LS_PREFIX}`);
  tokenCache.clear();
}
