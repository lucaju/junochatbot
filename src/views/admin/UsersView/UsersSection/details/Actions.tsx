import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button } from '@mui/material';
import { User } from '@src/types';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ActionsProps {
  dirty: boolean;
  handleCancel: () => void;
  handleDelete: () => void;
  isSubmitting: boolean;
  values: Partial<User>;
}

const Actions: FC<ActionsProps> = ({ dirty, handleCancel, handleDelete, isSubmitting, values }) => {
  const { t } = useTranslation();
  const { submitForm } = useFormikContext();

  return (
    <>
      <Button onClick={handleCancel}>{t('common:cancel')}</Button>

      {values.id && (
        <>
          <Box flexGrow={1} />
          <Button disabled={isSubmitting} onClick={handleDelete} variant="outlined">
            {t('common:delete')}
          </Button>
        </>
      )}

      <Box flexGrow={1} />

      <LoadingButton
        disabled={!dirty}
        loading={isSubmitting}
        onClick={submitForm}
        variant="contained"
      >
        {t('common:save')}
      </LoadingButton>
    </>
  );
};

export default Actions;
