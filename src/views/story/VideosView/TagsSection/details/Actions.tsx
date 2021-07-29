import { Box, Button } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { Tag } from '@src/types';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ActionsProps {
  dirty: boolean;
  handleCancel: () => void;
  handleDelete: () => void;
  isSubmitting: boolean;
  values: Partial<Tag>;
}

const Actions: FC<ActionsProps> = ({ dirty, handleCancel, handleDelete, isSubmitting, values }) => {
  const { t } = useTranslation(['common', 'tags']);
  const { submitForm } = useFormikContext();

  return (
    <>
      <Button onClick={handleCancel}>{t('cancel')}</Button>

      {values.id && (
        <>
          <Box flexGrow={1} />
          <Button disabled={isSubmitting} onClick={handleDelete} variant="outlined">
            {t('delete')}
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
        {t('save')}
      </LoadingButton>
    </>
  );
};

export default Actions;
