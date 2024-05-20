import { Navigate } from 'react-router';

import { ROUTES } from '../../constants/constants';
import { useLoginData } from '../state/loginState';

export interface Protected {
  children: JSX.Element;
}

export function ProtectedRouteForAuth({ children }: Protected): JSX.Element {
  const { isAuth } = useLoginData();

  if (isAuth) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
}

export function ProtectedRouteForNotAuth({ children }: Protected): JSX.Element {
  const { isAuth } = useLoginData();

  if (isAuth) {
    return children;
  }

  return <Navigate to={ROUTES.SING_IN} replace />;
}

export function ProtectedRouteForCartForAuth({ children }: Protected): JSX.Element {
  const { isAuth, customerId } = useLoginData();

  if (isAuth) {
    const newRoute: string = `${ROUTES.CART}/${customerId}`;

    return <Navigate to={newRoute} replace />;
  }

  return children;
}

export function ProtectedRouteForCartNotAuth({ children }: Protected): JSX.Element {
  const { isAuth } = useLoginData();

  if (isAuth) {
    return children;
  }

  const newRoute: string = `${ROUTES.CART}`;

  return <Navigate to={newRoute} replace />;
}
