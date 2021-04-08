import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import Notification from './components/Notification';
import { useApp } from './overmind';
import routes from './routes';
import theme from './theme';
import { useTracking } from './tracking';

const App: FC = () => {
  const routing = useRoutes(routes);
  const { state } = useApp();
  useTracking(process.env.GA_MEASUREMENT_ID);

  return (
    <ThemeProvider theme={theme(state.ui.darkMode)}>
      <CssBaseline />
      {routing}
      <Notification />
    </ThemeProvider>
  );
};

export default App;
