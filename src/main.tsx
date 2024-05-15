import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/App';
import './assets/styles/index.scss';
import { apiRoot } from './api/AdminBuilder';
import { loginUser } from './api/ClientBuilder';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// createCustomerMe().catch(()=>{
//   console.log(Error)
// })

loginUser().catch((error) => {
  console.log(error);
});
console.log(apiRoot.get().execute());
