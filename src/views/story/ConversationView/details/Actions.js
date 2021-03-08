/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(({ palette }) => ({
  progress: { position: 'absolute' },
  uppercase: { textTransform: 'uppercase' },
  warning: {
    color:
      palette.type === 'light' ? palette.warning.light : palette.warning.dark,
  },
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
      {intentData.id && !intentData.active ? (
        <>
          <Button color="primary" onClick={handleCancel}>
            {t('cancel')}
          </Button>
          <Box flexGrow={1} />
          <BlockIcon className={classes.warning} />
          <Typography
            className={clsx(classes.uppercase, classes.warning)}
            variant="subtitle1"
          >
             {t('intents:intentInactive')}
          </Typography>
          <Box flexGrow={1} />
          <Button
            disabled={isSubmitting}
            onClick={() => handleRestore('restore')}
            variant="outlined"
          >
            {t('restore')}
            {isSubmitting && buttonClicked === 'restore' && (
              <CircularProgress className={classes.progress} size={24} />
            )}
          </Button>
        </>
      ) : (
        <>
          <Button color="primary" onClick={handleCancel}>
            {t('cancel')}
          </Button>
          {values.id && (
            <>
              <Box flexGrow={1} />
              <Button
                color="primary"
                disabled={isSubmitting}
                onClick={() => handleDelete('delete')}
              >
                {t('delete')}
              </Button>
            </>
          )}
          <Box flexGrow={1} />
          <Button
            color="primary"
            disabled={isSubmitting}
            onClick={() => handleSubmit('submit')}
            variant="outlined"
          >
            {t('save')}
            {isSubmitting && buttonClicked === 'submit' && (
              <CircularProgress className={classes.progress} size={24} />
            )}
          </Button>
        </>
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
