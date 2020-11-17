import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const DeleteDialog = ({ open, handleDeleteClose, userId }) => {
  const handleCancel = () => {
    handleDeleteClose();
  };

  const handleOk = () => {
    handleDeleteClose(userId);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
    >
      <DialogTitle id="confirmation-dialog-title">Delete User</DialogTitle>
      <DialogContent dividers>
        Are you sure you want to delete this user?
      </DialogContent>
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
};

DeleteDialog.propTypes = {
  handleDeleteClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userId: PropTypes.any,
};

export default DeleteDialog;
