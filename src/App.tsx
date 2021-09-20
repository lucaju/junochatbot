import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import Notification from './components/Notification';
import { useAppState } from './overmind';
import routes from './routes';
import theme from './theme';
import { useTracking } from './tracking';

const App: FC = () => {
  const routing = useRoutes(routes);
  const { ui } = useAppState();
  useTracking(process.env.GA_MEASUREMENT_ID);

  return (
    <ThemeProvider theme={theme(ui.darkMode)}>
      <CssBaseline />
      {routing}
      <Notification />
    </ThemeProvider>
  );
};

export default App;
