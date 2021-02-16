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
  progress: { position: 'absolute' },
}));

const DeleteDialog = ({
  handleNo,
  handleYes,
  isSubmitting,
  message,
  open,
  title,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      aria-labelledby={title}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      open={open}
    >
      <DialogTitle id={title}>{title}</DialogTitle>
      <DialogContent dividers>{message}</DialogContent>
      <DialogActions>
        <Button
          autoFocus
          color="primary"
          disabled={isSubmitting}
          onClick={handleNo}
          variant="outlined"
        >
          No
        </Button>
        <Button color="secondary" disabled={isSubmitting} onClick={handleYes}>
          Yes
          {isSubmitting && (
            <CircularProgress className={classes.progress} size={24} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  handleNo: PropTypes.func.isRequired,
  handleYes: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default DeleteDialog;
