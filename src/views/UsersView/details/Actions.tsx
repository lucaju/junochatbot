import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '@src/types';

interface ActionsProps {
  dirty: boolean;
  handleCancel: () => void;
  handleDelete: () => void;
  isSubmitting: boolean;
  values: Partial<User>;
}

const useStyles = makeStyles(({ palette: { common, type } }) => ({
  progress: { position: 'absolute' },
  textColor: { color: type === 'light' ? common.white : common.black },
}));

const Actions: FC<ActionsProps> = ({
  dirty,
  handleCancel,
  handleDelete,
  isSubmitting,
  values,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'users']);
  const { submitForm } = useFormikContext();

  const handleSubmit = async () => await submitForm();

  return (
    <>
      <Button onClick={handleCancel}>{t('cancel')}</Button>

      {values.id && (
        <>
          <Box flexGrow={1} />
          <Button
            disabled={isSubmitting}
            onClick={() => handleDelete()}
            variant="outlined"
          >
            {t('delete')}
          </Button>
        </>
      )}

      <Box flexGrow={1} />

      <Button
        classes={{ containedPrimary: classes.textColor }}
        color="primary"
        disabled={isSubmitting || !dirty}
        onClick={handleSubmit}
        variant="contained"
      >
        {t('save')}
        {isSubmitting && (
          <CircularProgress className={classes.progress} size={24} />
        )}
      </Button>
    </>
  );
};

export default Actions;
