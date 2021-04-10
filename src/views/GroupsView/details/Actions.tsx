import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserGroup } from '../../../types';

interface ActionsProps {
  dirty: boolean;
  handleCancel: () => void;
  handleDelete: (action: string) => void;
  isSubmitting: boolean;
  values: Partial<UserGroup>;
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
  const { t } = useTranslation(['common', 'groups']);
  const { submitForm } = useFormikContext();
  const [buttonClicked, setButtonClicked] = useState<string | undefined>();

  const handleSubmit = async () => await submitForm();

  return (
    <>
      <Button onClick={handleCancel}>{t('cancel')}</Button>

      {values.id && (
        <>
          <Box flexGrow={1} />
          <Button
            disabled={isSubmitting}
            onClick={() => handleDelete('delete')}
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
