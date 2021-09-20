import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ConfirmationDialogProps {
  open: boolean;
  title?: string;
  message: string;
  handleNo: () => void;
  handleYes: () => void;
  isSubmitting?: boolean;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  open,
  title,
  message,
  handleNo,
  handleYes,
  isSubmitting = false,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      aria-labelledby={title}
      // disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      open={open}
    >
      {title && (
        <DialogTitle id={title} sx={{ textTransform: 'capitalize' }}>
          {title}
        </DialogTitle>
      )}
      <DialogContent dividers>{message}</DialogContent>
      <DialogActions>
        <Button
          autoFocus
          color="primary"
          disabled={isSubmitting}
          onClick={handleNo}
          variant="outlined"
        >
          {t('common:no')}
        </Button>
        <LoadingButton color="secondary" loading={isSubmitting} onClick={handleYes}>
          {t('common:yes')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
