import { Navigate } from 'react-router';

import { useUserData } from '../state/state';
import { ROUTES } from '../../constants/constants';

export interface Protected {
  children: JSX.Element;
}

export function ProtectedRouteForAuth({ children }: Protected): JSX.Element {
  const { isAuth } = useUserData();

  if (isAuth) {
    return <Navigate to={ROUTES.MAIN} replace />;
  }

  return children;
}

export function ProtectedRouteForNotAuth({ children }: Protected): JSX.Element {
  const { isAuth } = useUserData();

  if (isAuth) {
    return children;
  }

  return <Navigate to={ROUTES.LOGIN} replace />;
}

export function ProtectedRouteForCart({ children }: Protected): JSX.Element {
  const { isAuth, customerId } = useUserData();

  if (isAuth) {
    console.log(children);
    const newRoute: string = `${ROUTES.CART}/${customerId}`;

    return <Navigate to={newRoute} replace />;
  }

  return <Navigate to={ROUTES.CART} replace />;
}
