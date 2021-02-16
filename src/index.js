import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { config } from './overmind';
import { BrowserRouter } from 'react-router-dom';
import './i18next';

const overmind = createOvermind(config, {
  devtools: true, // defaults to 'localhost:3031'
  logProxies: true,
});

render(
  <Provider value={overmind}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#app')
);

if (module.hot) module.hot.accept();
