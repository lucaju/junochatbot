import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
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

const DeleteDialog: FC<DeleteDialogProps> = ({
  open,
  title,
  message,
  handleNo,
  handleYes,
  isSubmitting = false,
}) => {
  const { t } = useTranslation(['common']);

  return (
    <Dialog
      aria-labelledby={title}
      // disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      open={open}
    >
      <DialogTitle id={title} sx={{ textTransform: 'capitalize' }}>
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
        <LoadingButton
          color="secondary"
          loading={isSubmitting}
          onClick={handleYes}
        >
          {t('yes')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
