import { RouterProvider } from 'react-router';
import { useEffect } from 'react';

import { routeRender } from '../core/routes/routesConfig';
import styles from './_app.module.scss';
import { useLoginData } from '../core/state/userState';
import { useBoundStore } from '../core/state/boundState';

export default function App(): JSX.Element {
  const { setCart, setPromoCodes } = useBoundStore();
  const { customerId } = useLoginData();

  useEffect(() => {
    setCart(customerId).catch((err) => {
      console.log(err);
    });
    setPromoCodes().catch((err) => {
      console.log(err);
    });
  }, [customerId, setCart, setPromoCodes]);

  return (
    <div className={styles.app} data-testid="app">
      <RouterProvider router={routeRender} />
    </div>
  );
}
