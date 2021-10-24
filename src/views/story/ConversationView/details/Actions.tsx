/* eslint-disable no-unused-vars */
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button } from '@mui/material';
import { useAppState } from '@src/overmind';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ActionsProps {
  deletable?: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
  handleDelete: () => void;
  isSubmitting: boolean;
}

const Actions: FC<ActionsProps> = ({
  deletable = true,
  handleCancel,
  handleDelete,
  handleSubmit,
  isSubmitting,
}) => {
  const { t } = useTranslation();
  const { intents } = useAppState();

  return (
    <>
      <Button onClick={handleCancel}>{t('common:close')}</Button>

      {intents.currentIntent?.name && (
        <>
          <Box flexGrow={1} />
          <Button disabled={isSubmitting || !deletable} onClick={handleDelete} variant="outlined">
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
