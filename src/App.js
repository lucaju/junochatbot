import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import Notification from 'src/components/Notification';
import { useApp } from 'src/overmind';
import routes from './routes';
import theme from './theme';
import { useTracking } from './tracking'

const App = () => {
  const routing = useRoutes(routes);
  const { state } = useApp();
  useTracking(process.env.GA_MEASUREMENT_ID)

  return (
    <ThemeProvider theme={theme(state.ui.darkMode)}>
      <CssBaseline />
      {routing}
      <Notification />
    </ThemeProvider>
  );
};

export default App;
