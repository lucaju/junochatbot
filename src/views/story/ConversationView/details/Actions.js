/* eslint-disable no-unused-vars */
import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(({ palette }) => ({
  progress: { position: 'absolute' },
  textColor: { color: palette.type === 'light' && palette.common.white },
}));

const Actions = ({
  dirty,
  handleCancel,
  handleDelete,
  intentData,
  isSubmitting,
  values,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['common', 'intents']);
  const { submitForm } = useFormikContext();
  const [buttonClicked, setButtonClicked] = useState(null);

  const handleSubmit = async (source) => {
    setButtonClicked(source);
    await submitForm();
  };

  const handleRestore = async (source) => {
    setButtonClicked(source);
    values.submitType = 'restore';
    await submitForm();
  };

  return (
    <>
      <Button onClick={handleCancel}>{t('cancel')}</Button>

      {values.id && intentData.active && (
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

      {intentData.id && !intentData.active ? (
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
          disabled={isSubmitting}
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

Actions.propTypes = {
  dirty: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleDelete: PropTypes.func,
  intentData: PropTypes.object,
  isSubmitting: PropTypes.bool,
  values: PropTypes.object,
};

export default Actions;
