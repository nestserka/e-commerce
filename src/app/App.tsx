// import { useState } from 'react';

import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import style from './_app.module.scss';
import { routesConfig } from '../core/routes/routes-config.tsx';

// import type { Dispatch, SetStateAction } from 'react';

export default function App(): JSX.Element {
  const routeRender = createBrowserRouter(routesConfig);

  return (
    <div className={style.app} data-testid="app">
      <RouterProvider router={routeRender} />
    </div>
  );
}
