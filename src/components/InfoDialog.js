import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const InfoDialog = ({ handleOk, message, open, title }) => (
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
      <Button onClick={handleOk} color="primary">
        Ok
      </Button>
    </DialogActions>
  </Dialog>
);

InfoDialog.propTypes = {
  handleOk: PropTypes.func,
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default InfoDialog;
