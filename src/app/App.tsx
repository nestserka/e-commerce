import { RouterProvider } from 'react-router';
import { useEffect } from 'react';

import { routeRender } from '../core/routes/routesConfig';
import styles from './_app.module.scss';
import { useCartData } from '../core/state/cartState';
import { useLoginData } from '../core/state/userState';

export default function App(): JSX.Element {
  const { setCart } = useCartData();
  const { customerId } = useLoginData();

  useEffect(() => {
    setCart(customerId).catch((err) => {
      console.log(err);
    });
  }, [customerId, setCart]);

  return (
    <div className={styles.app} data-testid="app">
      <RouterProvider router={routeRender} />
    </div>
  );
}
