/* eslint-disable no-unused-vars */
import { Box, Button } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useApp } from '@src/overmind';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ActionsProps {
  handleSubmit: () => void;
  handleCancel: () => void;
  handleDelete: () => void;
  isSubmitting: boolean;
}

const Actions: FC<ActionsProps> = ({ handleCancel, handleDelete, handleSubmit, isSubmitting }) => {
  const { t } = useTranslation(['common', 'videos']);
  const { state } = useApp();

  return (
    <>
      <Button onClick={handleCancel}>{t('cancel')}</Button>

      {state.intents.currentIntent?.name && (
        <>
          <Box flexGrow={1} />
          <Button onClick={handleDelete} variant="outlined">
            {t('delete')}
          </Button>
        </>
      )}

      <Box flexGrow={1} />

      <LoadingButton onClick={handleSubmit} loading={isSubmitting} variant="contained">
        {t('save')}
      </LoadingButton>
    </>
  );
};

export default Actions;
