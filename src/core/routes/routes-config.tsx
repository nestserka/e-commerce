import { type RouteObject, createBrowserRouter } from 'react-router-dom';

import AboutUsPage from '../../pages/aboutUsPage/AboutUsPage';
import CartPage from '../../pages/cartPage/CartPage';
import CatalogPage from '../../pages/catalogPage/CatalogPage';
import CategoryPage from '../../pages/category/Category';
import LoginPage from '../../pages/loginPage/LoginPage';
import Layout from '../../pages/layout/Layout';
import MainPage from '../../pages/mainPage/MainPage';
import NotFoundPage from '../../pages/notFoundPage/NotFoundPage';
import ProductPage from '../../pages/productPage/ProductPage';
import ProfilePage from '../../pages/profilePage/ProfilePage';
import RegistrationPage from '../../pages/registrationPage.tsx/RegistrationPage';
import { ProtectedRouteForAuth, ProtectedRouteForCart, ProtectedRouteForNotAuth } from './protected-route';
import { ROUTES } from '../../constants/constants';

export const routesConfig: RouteObject[] = [
  {
    path: ROUTES.START,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: ROUTES.MAIN,
        element: <MainPage />,
      },
      {
        path: ROUTES.PRODUCT_BESTSELLER,
        element: <ProductPage />,
      },
      {
        path: ROUTES.ABOUT_US,
        element: <AboutUsPage />,
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
          <ProtectedRouteForCart>
            <CartPage />
          </ProtectedRouteForCart>
        ),
      },
      {
        path: ROUTES.CART_CUSTOMER,
        element: (
          <ProtectedRouteForCart>
            <CartPage />
          </ProtectedRouteForCart>
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
        path: ROUTES.LOGIN,
        element: (
          <ProtectedRouteForAuth>
            <LoginPage />
          </ProtectedRouteForAuth>
        ),
      },
      {
        path: ROUTES.REGISTRATION,
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
