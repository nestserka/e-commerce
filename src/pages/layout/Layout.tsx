import { Outlet } from 'react-router';
import { Suspense } from 'react';

import Header from '../../domain/header/Header';
import Footer from '../../domain/footer/Footer';

export default function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}
