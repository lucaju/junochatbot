import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(() => ({
  buttonProgress: { position: 'absolute' },
}));

const DeleteDialog = ({
  handleYes,
  handleNo,
  isSubmitting,
  message,
  open,
  title,
}) => {
  const classes = useStyles();

  return (
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
        <Button
          disabled={isSubmitting}
          autoFocus
          onClick={handleNo}
          color="primary"
        >
          No
        </Button>
        <Button onClick={handleYes} disabled={isSubmitting} color="primary">
          Yes
          {isSubmitting && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  handleYes: PropTypes.func.isRequired,
  handleNo: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default DeleteDialog;
