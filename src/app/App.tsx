import { RouterProvider } from 'react-router';

import { routeRender } from '../core/routes/routesConfig';
import styles from './_app.module.scss';

export default function App(): JSX.Element {
  return (
    <div className={styles.app} data-testid="app">
      <RouterProvider router={routeRender} />
    </div>
  );
}
