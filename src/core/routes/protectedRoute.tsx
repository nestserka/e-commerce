import { Navigate, useParams } from 'react-router';

import { ROUTES } from '../../constants/constants';
import { useLoginData } from '../state/userState';

import type { Protected } from './types';

export function ProtectedRouteForAuth({ children }: Protected): JSX.Element {
  const { isAuth } = useLoginData();

  if (isAuth) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
}

export function ProtectedRouteForCartForAuth({ children }: Protected): JSX.Element {
  const { isAuth, customerId } = useLoginData();

  if (isAuth) {
    const newRoute: string = `${ROUTES.CART}/${customerId}`;

    return <Navigate to={newRoute} replace />;
  }

  return children;
}

export function ProtectedRouteForProfileForAuth({ children }: Protected): JSX.Element {
  const { isAuth, customerId: authCustomerId } = useLoginData();
  const { customerId: routeCustomerId } = useParams();

  if (isAuth && authCustomerId === routeCustomerId) {
    return children;
  }

  return <Navigate to={ROUTES.SING_IN} replace />;
}

export function ProtectedRouteForCartNotAuth({ children }: Protected): JSX.Element {
  const { isAuth } = useLoginData();

  if (isAuth) {
    return children;
  }

  const newRoute: string = `${ROUTES.CART}`;

  return <Navigate to={newRoute} replace />;
}
