import { useState } from 'react';

import type { Dispatch, SetStateAction } from 'react';
import './App.scss';

export default function App(): JSX.Element {
  const [count, setCount]: [number, Dispatch<SetStateAction<number>>] = useState(0);

  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((prevCount) => prevCount + 1);
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}
