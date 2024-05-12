import { type RouteObject, createBrowserRouter } from 'react-router-dom';

import CartPage from '../../pages/cartPage/CartPage';
import CatalogPage from '../../pages/catalogPage/CatalogPage';
import CategoryPage from '../../pages/category/Category';
import LoginPage from '../../pages/loginPage/LoginPage';
import Layout from '../../pages/layout/Layout';
import NotFoundPage from '../../pages/notFoundPage/NotFoundPage';
import ProductPage from '../../pages/productPage/ProductPage';
import ProfilePage from '../../pages/profilePage/ProfilePage';
import RegistrationPage from '../../pages/registrationPage.tsx/RegistrationPage';
import {
  ProtectedRouteForAuth,
  ProtectedRouteForCartForAuth,
  ProtectedRouteForCartNotAuth,
  ProtectedRouteForNotAuth,
} from './protected-route';
import { ROUTES } from '../../constants/constants';
import AboutPage from '../../pages/aboutUsPage/AboutPage';
import HomePage from '../../pages/homePage/HomePage';

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
