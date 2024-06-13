import { Outlet } from 'react-router';
import { Suspense } from 'react';

import Header from '../../domain/header/Header';
import Footer from '../../domain/footer/Footer';
import Loader from '../../components/loader/Loader';

export default function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="loading">
            <Loader />
          </div>
        }
      >
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}
