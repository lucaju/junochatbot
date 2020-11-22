import React from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import routes from './routes';
import theme from './theme';
import { useApp } from 'src/overmind';

const App = () => {
  const routing = useRoutes(routes);
  const { state } = useApp();

  return (
    <ThemeProvider theme={theme(state.ui.darkMode)}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
};

export default App;
