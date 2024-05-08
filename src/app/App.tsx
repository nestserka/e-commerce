import { RouterProvider } from 'react-router';

import { routeRender } from '../core/routes/routes-config';
import style from './_app.module.scss';

export default function App(): JSX.Element {
  return (
    <div className={style.app} data-testid="app">
      <RouterProvider router={routeRender} />
    </div>
  );
}
