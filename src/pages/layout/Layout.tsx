import { Outlet } from 'react-router';

import Header from '../../domain/header/Header';
import Footer from '../../domain/footer/Footer';

export default function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
