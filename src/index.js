import { createOvermind } from 'overmind';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'overmind-react';

import App from './components/App';
import { config } from './app';

const overmind = createOvermind(config,{
    devtools: true, // defaults to 'localhost:3031'
    logProxies: true,
});


render(
    <Provider value={overmind}>
        <App />
    </Provider>,
    document.querySelector('#app')
);

if (module.hot) module.hot.accept();
