/* eslint-disable no-unused-vars */
import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Video } from '../../../../types';

interface ActionsProps {
  dirty: boolean;
  dirtyFromYoutube: boolean;
  handleCancel: () => void;
  handleDelete: () => void;
  isSubmitting: boolean;
  values: Partial<Video>;
}

const useStyles = makeStyles(({ palette: { common, type } }) => ({
  progress: { position: 'absolute' },
  textColor: { color: type === 'light' ? common.white : common.black },
}));

const Actions: FC<ActionsProps> = ({
  dirty,
  dirtyFromYoutube,
  handleCancel,
  handleDelete,
  isSubmitting,
  values,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'videos']);
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
        disabled={isSubmitting || (!dirty && !dirtyFromYoutube)}
        onClick={() => handleSubmit()}
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
