import AboutUsPage from '../../pages/aboutUsPage/AboutUsPage.tsx';
import CartPage from '../../pages/cartPage/CartPage.tsx';
import CatalogPage from '../../pages/catalogPage/CatalogPage.tsx';
import CategoryPage from '../../pages/category/Category.tsx';
import LoginPage from '../../pages/loginPage/LoginPage.tsx';
import Layout from '../../pages/layout/Layout.tsx';
import MainPage from '../../pages/mainPage/MainPage.tsx';
import NotFoundPage from '../../pages/notFoundPage/NotFoundPage.tsx';
import ProductPage from '../../pages/productPage/ProductPage.tsx';
import ProfilePage from '../../pages/profilePage/ProfilePage.tsx';
import RegistrationPage from '../../pages/registrationPage.tsx/RegistrationPage.tsx';
import { ROUTES } from './types';

import type { RouteObject } from 'react-router-dom';

export const routesConfig: RouteObject[] = [
  {
    path: ROUTES.START,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <NotFoundPage />,
      },
      {
        path: ROUTES.START,
        element: <MainPage />,
        children: [
          {
            path: ROUTES.PRODUCT_BESTSELLER,
            element: <ProductPage />,
          },
        ],
      },
      {
        path: ROUTES.MAIN,
        element: <MainPage />,
        children: [
          {
            path: ROUTES.PRODUCT_BESTSELLER,
            element: <ProductPage />,
          },
        ],
      },
      {
        path: ROUTES.ABOUT_US,
        element: <AboutUsPage />,
      },
      {
        path: ROUTES.CATALOG,
        element: <CatalogPage />,
        children: [
          {
            path: ROUTES.CATEGORY,
            element: <CategoryPage />,
            children: [
              {
                path: ROUTES.PRODUCT,
                element: <ProductPage />,
              },
            ],
          },
        ],
      },
      {
        path: ROUTES.CART,
        element: <CartPage />,
      },
      {
        path: ROUTES.CART_CUSTOMER,
        element: <CartPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTRATION,
        element: <RegistrationPage />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
];
