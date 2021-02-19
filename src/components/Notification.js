import { Slide, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import { useApp } from 'src/overmind';

const TransitionRight = (props) => {
  return <Slide {...props} direction="right" />;
};

const Notification = () => {
  const { state, actions } = useApp();

  const handleInternalClose = (event, reason) => {
    if (reason === 'clickaway') return;
    actions.ui.closeNotification();
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      autoHideDuration={6000}
      onClose={handleInternalClose}
      open={state.ui.open}
      TransitionComponent={TransitionRight}
    >
      <MuiAlert
        elevation={6}
        onClose={handleInternalClose}
        severity={state.ui.type}
        variant="filled"
      >
        {state.ui.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Notification;
