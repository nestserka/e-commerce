import { Outlet } from 'react-router';

import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { NAVLINKS } from '../../constants/constants';

export default function Layout(): JSX.Element {
  return (
    <>
      <Header links={NAVLINKS} />
      <Outlet />
      <Footer />
    </>
  );
}
