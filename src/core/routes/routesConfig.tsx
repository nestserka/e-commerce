import { type RouteObject, createBrowserRouter } from 'react-router-dom';

import Layout from '../../pages/layout/Layout';
import { ROUTES } from '../../constants/constants';
import {
  ProtectedRouteForAuth,
  ProtectedRouteForCartForAuth,
  ProtectedRouteForCartNotAuth,
  ProtectedRouteForProfileForAuth,
} from './protectedRoute';
import {
  AboutPage,
  CartPage,
  CatalogPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ProductPage,
  ProfilePage,
  RegistrationPage,
} from './lazyConstant';
import CategoryPage from '../../pages/categoryPage/CategoryPage';

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
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTES.CATALOG,
        element: <CatalogPage />,
        children: [
          {
            path: ROUTES.CATEGORY,
            element: <CategoryPage />,
          },
          {
            path: ROUTES.CATALOG_SUBTREES,
            element: <CategoryPage />,
          },
        ],
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
          <ProtectedRouteForProfileForAuth>
            <ProfilePage />
          </ProtectedRouteForProfileForAuth>
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
