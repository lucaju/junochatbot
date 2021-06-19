/* eslint-disable no-unused-vars */
import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { useApp } from '@src/overmind';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ActionsProps {
  handleSubmit: () => void;
  handleCancel: () => void;
  handleDelete: () => void;
  isSubmitting: boolean;
}

const useStyles = makeStyles(({ palette: { common, type } }) => ({
  progress: { position: 'absolute' },
  textColor: { color: type === 'light' ? common.white : common.black },
}));

const Actions: FC<ActionsProps> = ({ handleCancel, handleDelete, handleSubmit, isSubmitting }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'videos']);
  const { state } = useApp();

  return (
    <>
      <Button onClick={handleCancel}>{t('cancel')}</Button>

      {state.intents.currentIntent?.name && (
        <>
          <Box flexGrow={1} />
          <Button disabled={isSubmitting} onClick={handleDelete} variant="outlined">
            {t('delete')}
          </Button>
        </>
      )}

      <Box flexGrow={1} />

      <Button
        classes={{ containedPrimary: classes.textColor }}
        color="primary"
        disabled={isSubmitting}
        onClick={handleSubmit}
        variant="contained"
      >
        {t('save')}
        {isSubmitting && <CircularProgress className={classes.progress} size={24} />}
      </Button>
    </>
  );
};

export default Actions;
