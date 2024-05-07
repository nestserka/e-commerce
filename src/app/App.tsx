// import { useState } from 'react';
import style from './_app.module.scss';
import Footer from '../components/footer/Footer.tsx';
import Header from '../components/header/Header.tsx';
import { useCounter } from '../state/state';
import { type NavLink } from '../components/navigation/types.tsx';

// import type { Dispatch, SetStateAction } from 'react';

const navLinks: NavLink[] = [
  { linkTitle: 'Home', route: '/home' },
  { linkTitle: 'Sign In', route: '/signin' },
  { linkTitle: 'Sign Up', route: '/signup' },
  { linkTitle: 'Catalog', route: '/catalog' },
  { linkTitle: 'About', route: '/about' },
];

export default function App(): JSX.Element {
  // const [count, setCount]: [number, Dispatch<SetStateAction<number>>] = useState(0);

  const { count: zustandCount, increment: zustandIncrement } = useCounter();

  return (
    <div className={style.app} data-testid="app">
      <Header links={navLinks} />
      <h1>NASA store</h1>
      <div className="card">
        <button
          onClick={() => {
            zustandIncrement();
          }}
        >
          Count is {zustandCount}
        </button>
        <p>count is {zustandCount}</p>
      </div>
      <Footer />
    </div>
  );
}
