import { Slide, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React from 'react';

const TransitionRight = (props) => {
  return <Slide {...props} direction="right" />;
};

const Notification = ({ handleClose, message, open, type = 'info' }) => {
  const handleInternalClose = (event, reason) => {
    if (reason === 'clickaway') return;
    handleClose();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleInternalClose}
      TransitionComponent={TransitionRight}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={type}
        onClose={handleInternalClose}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

Notification.defaultProps = {
  message: '',
  open: false,
  type: 'info',
};

Notification.propTypes = {
  handleClose: PropTypes.func,
  message: PropTypes.string,
  open: PropTypes.bool,
  type: PropTypes.string,
};

export default Notification;
