import { Alert, Slide, Snackbar } from '@material-ui/core';
import { useApp } from '@src/overmind';
import React from 'react';

const TransitionRight = (props: any) => {
  return <Slide {...props} direction="right" />;
};

const Notification = () => {
  const { state, actions } = useApp();

  const handleInternalClose = () => actions.ui.closeNotification();

  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      autoHideDuration={6000}
      onClose={handleInternalClose}
      open={state.ui.notification.open}
      TransitionComponent={TransitionRight}
    >
      <Alert
        elevation={6}
        onClose={handleInternalClose}
        severity={state.ui.notification.type}
        sx={{
          '& ::first-letter': { textTransform: 'uppercase' },
        }}
        variant="filled"
      >
        {state.ui.notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
