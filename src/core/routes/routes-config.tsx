import { type RouteObject, createBrowserRouter } from 'react-router-dom';

import Layout from '../../pages/layout/Layout';
import { ROUTES } from '../../constants/constants';
import {
  ProtectedRouteForAuth,
  ProtectedRouteForCartForAuth,
  ProtectedRouteForCartNotAuth,
  ProtectedRouteForNotAuth,
} from './protected-route';
import {
  AboutPage,
  CartPage,
  CatalogPage,
  CategoryPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ProductPage,
  ProfilePage,
  RegistrationPage,
} from './lazy-constant';

export const routesConfig: RouteObject[] = [
  {
    path: ROUTES.START,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.PRODUCT_BESTSELLER,
        element: <ProductPage />,
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTES.CATALOG,
        element: <CatalogPage />,
      },
      {
        path: ROUTES.CATEGORY,
        element: <CategoryPage />,
      },
      {
        path: ROUTES.PRODUCT,
        element: <ProductPage />,
      },
      {
        path: ROUTES.CART,
        element: (
          <ProtectedRouteForCartForAuth>
            <CartPage />
          </ProtectedRouteForCartForAuth>
        ),
      },
      {
        path: ROUTES.CART_CUSTOMER,
        element: (
          <ProtectedRouteForCartNotAuth>
            <CartPage />
          </ProtectedRouteForCartNotAuth>
        ),
      },
      {
        path: ROUTES.PROFILE,
        element: (
          <ProtectedRouteForNotAuth>
            <ProfilePage />
          </ProtectedRouteForNotAuth>
        ),
      },
      {
        path: ROUTES.SING_IN,
        element: (
          <ProtectedRouteForAuth>
            <LoginPage />
          </ProtectedRouteForAuth>
        ),
      },
      {
        path: ROUTES.SING_UP,
        element: (
          <ProtectedRouteForAuth>
            <RegistrationPage />
          </ProtectedRouteForAuth>
        ),
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
];

export const routeRender = createBrowserRouter(routesConfig);
