import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const DeleteDialog = ({ handleOk, handleCancel, message, open, title }) => (
  <Dialog
    disableBackdropClick
    disableEscapeKeyDown
    maxWidth="xs"
    aria-labelledby={title}
    open={open}
  >
    <DialogTitle id={title}>{title}</DialogTitle>
    <DialogContent dividers>{message}</DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleCancel} color="primary">
        No
      </Button>
      <Button onClick={handleOk} color="primary">
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);

DeleteDialog.propTypes = {
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default DeleteDialog;
