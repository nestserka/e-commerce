// import { useState } from 'react';

import style from './_app.module.scss';
import { useCounter } from '../state/state';

// import type { Dispatch, SetStateAction } from 'react';

export default function App(): JSX.Element {
  // const [count, setCount]: [number, Dispatch<SetStateAction<number>>] = useState(0);

  const {count:zustandCount, increment: zustandIncrement} = useCounter()

  return (
    <div className={style.app} data-testid="app">

      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            zustandIncrement();
          }}
        >
          Count is {zustandCount}
        </button>
        <p>
          count is {zustandCount}
        </p>
      </div>
      <p >Click on the Vite and React logos to learn more</p>
    </div>
  );
}
