import { Outlet } from 'react-router';

import Footer from '../../components/footer/Footer.tsx';
import Header from '../../components/header/Header.tsx';

export default function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
