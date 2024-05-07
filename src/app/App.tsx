// import { useState } from 'react';
import style from './_app.module.scss';
import Footer from '../components/footer/Footer.tsx';
import Header from '../components/header/Header.tsx';
import { useCounter } from '../state/state';
import { NAVLINKS } from '../constants/constants.tsx';

// import type { Dispatch, SetStateAction } from 'react';

export default function App(): JSX.Element {
  // const [count, setCount]: [number, Dispatch<SetStateAction<number>>] = useState(0);

  const { count: zustandCount, increment: zustandIncrement } = useCounter();

  return (
    <div className={style.app} data-testid="app">
      <Header links={NAVLINKS} />
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
