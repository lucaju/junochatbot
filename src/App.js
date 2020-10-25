import React from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
// import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import theme from './theme';

// import RouterSwitcher from './components/RouterSwitcher';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
};

export default App;
