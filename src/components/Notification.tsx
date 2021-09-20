import { Alert, Slide, Snackbar } from '@mui/material';
import { useAppState, useActions } from '@src/overmind';
import React from 'react';

const TransitionRight = (props: any) => {
  return <Slide {...props} direction="right" />;
};

const Notification = () => {
  const { ui } = useAppState();
  const actions = useActions();

  const handleInternalClose = () => actions.ui.closeNotification();

  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      autoHideDuration={6000}
      onClose={handleInternalClose}
      open={ui.notification.open}
      TransitionComponent={TransitionRight}
    >
      <Alert
        elevation={6}
        onClose={handleInternalClose}
        severity={ui.notification.type}
        sx={{
          '& ::first-letter': { textTransform: 'uppercase' },
        }}
        variant="filled"
      >
        {ui.notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
