import React from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import routes from './routes';
import theme from './theme';
import { useApp } from 'src/overmind';
import Notification from 'src/components/Notification';

const App = () => {
  const routing = useRoutes(routes);
  const { state, actions } = useApp();

  return (
    <ThemeProvider theme={theme(state.ui.darkMode)}>
      <CssBaseline />
      {routing}
      <Notification
        open={state.ui.notification.open}
        handleClose={() => actions.ui.closeNotification()}
        message={state.ui.notification.message}
        type={state.ui.notification.type}
      />
    </ThemeProvider>
  );
};

export default App;
