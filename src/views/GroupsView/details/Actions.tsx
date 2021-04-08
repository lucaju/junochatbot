import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserGroup } from '../../../types';

interface ActionsProps {
  dirty: boolean;
  groupData: Partial<UserGroup>;
  handleCancel: () => void;
  handleDelete: (action: string) => void;
  setRestore: (acitve: boolean) => void;
  isSubmitting: boolean;
  values: Partial<UserGroup>;
}

const useStyles = makeStyles(({ palette: { common, type } }) => ({
  progress: { position: 'absolute' },
  textColor: { color: type === 'light' ? common.white : common.black },
}));

const Actions: FC<ActionsProps> = ({
  dirty,
  groupData,
  handleCancel,
  handleDelete,
  setRestore,
  isSubmitting,
  values,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'groups']);
  const { submitForm } = useFormikContext();
  const [buttonClicked, setButtonClicked] = useState<string | undefined>();

  const handleSubmit = async (source: string) => {
    setButtonClicked(source);
    await submitForm();
  };

  const handleRestore = async (source: string) => {
    setButtonClicked(source);
    setRestore(true);
    await submitForm();
  };

  return (
    <>
      <Button onClick={handleCancel}>{t('cancel')}</Button>

      {values.id && groupData.active && (
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

      {groupData.id && !groupData.active ? (
        <Button
          classes={{ containedPrimary: classes.textColor }}
          color="primary"
          disabled={isSubmitting}
          onClick={() => handleRestore('restore')}
          variant="contained"
        >
          {t('restore')}
          {isSubmitting && buttonClicked === 'restore' && (
            <CircularProgress className={classes.progress} size={24} />
          )}
        </Button>
      ) : (
        <Button
          classes={{ containedPrimary: classes.textColor }}
          color="primary"
          disabled={isSubmitting || !dirty}
          onClick={() => handleSubmit('submit')}
          variant="contained"
        >
          {t('save')}
          {isSubmitting && buttonClicked === 'submit' && (
            <CircularProgress className={classes.progress} size={24} />
          )}
        </Button>
      )}
    </>
  );
};

export default Actions;
