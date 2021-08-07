/* eslint-disable no-unused-vars */
import { Box, Button } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useAppState } from '@src/overmind';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ActionsProps {
  handleSubmit: () => void;
  handleCancel: () => void;
  handleDelete: () => void;
  isSubmitting: boolean;
}

const Actions: FC<ActionsProps> = ({ handleCancel, handleDelete, handleSubmit, isSubmitting }) => {
  const { t } = useTranslation();
  const { intents } = useAppState();

  return (
    <>
      <Button onClick={handleCancel}>{t('common:close')}</Button>

      {intents.currentIntent?.name && (
        <>
          <Box flexGrow={1} />
          <Button disabled={isSubmitting} onClick={handleDelete} variant="outlined">
            {t('common:delete')}
          </Button>
        </>
      )}

      <Box flexGrow={1} />

      <LoadingButton
        disabled={!intents.currentIntent?.hasChanged ?? false}
        loading={isSubmitting}
        onClick={handleSubmit}
        variant="contained"
      >
        {t('common:save')}
      </LoadingButton>
    </>
  );
};

export default Actions;
