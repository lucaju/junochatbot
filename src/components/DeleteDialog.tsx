import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface DeleteDialogProps {
  open: boolean;
  title: string;
  message: string;
  handleNo: () => void;
  handleYes: () => void;
  isSubmitting?: boolean;
}

const useStyles = makeStyles(() => ({
  capitalize: { textTransform: 'capitalize' },
  progress: { position: 'absolute' },
}));

const DeleteDialog: FC<DeleteDialogProps> = ({
  open,
  title,
  message,
  handleNo,
  handleYes,
  isSubmitting = false,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);

  return (
    <Dialog
      aria-labelledby={title}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      open={open}
    >
      <DialogTitle className={classes.capitalize} id={title}>
        {title}
      </DialogTitle>
      <DialogContent dividers>{message}</DialogContent>
      <DialogActions>
        <Button
          autoFocus
          color="primary"
          disabled={isSubmitting}
          onClick={handleNo}
          variant="outlined"
        >
          {t('no')}
        </Button>
        <Button color="secondary" disabled={isSubmitting} onClick={handleYes}>
          {t('yes')}
          {isSubmitting && (
            <CircularProgress className={classes.progress} size={24} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
