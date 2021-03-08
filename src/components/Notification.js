import { makeStyles, Slide, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import { useApp } from 'src/overmind';

const useStyles = makeStyles(() => ({
  firstLetterUppercase: {
    '& ::first-letter': {
      textTransform: 'uppercase',
    },
  },
}));

const TransitionRight = (props) => {
  return <Slide {...props} direction="right" />;
};

const Notification = () => {
  const classes = useStyles();
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
      open={state.ui.notification.open}
      TransitionComponent={TransitionRight}
    >
      <MuiAlert
        className={classes.firstLetterUppercase}
        elevation={6}
        onClose={handleInternalClose}
        severity={state.ui.notification.type}
        variant="filled"
      >
        {state.ui.notification.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Notification;
