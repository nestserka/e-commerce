import { lazy } from 'react';

export const HomePage = lazy(() => import('../../pages/homePage/HomePage'));

export const AboutPage = lazy(() => import('../../pages/aboutPage/AboutPage'));

export const RegistrationPage = lazy(() => import('../../pages/registrationPage.tsx/RegistrationPage'));

export const ProfilePage = lazy(() => import('../../pages/profilePage/ProfilePage'));

export const ProductPage = lazy(() => import('../../pages/productPage/ProductPage'));

export const LoginPage = lazy(() => import('../../pages/loginPage/LoginPage'));

export const CartPage = lazy(() => import('../../pages/cartPage/CartPage'));

export const CatalogPage = lazy(() => import('../../pages/catalogPage/CatalogPage'));

export const NotFoundPage = lazy(() => import('../../pages/notFoundPage/NotFoundPage'));
