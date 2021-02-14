/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  makeStyles,
  Switch,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import BlockIcon from '@material-ui/icons/Block';

const useStyles = makeStyles(({ palette }) => ({
  buttonProgress: { position: 'absolute' },
  uppercase: { textTransform: 'uppercase' },
  warning: {
    color:
      palette.type === 'light' ? palette.warning.light : palette.warning.dark,
  },
}));

const Actions = ({
  dirty,
  handleBlur,
  handleCancel,
  handleChange,
  isSubmitting,
  name,
  userData,
  values,
}) => {
  const classes = useStyles();
  const { submitForm } = useFormikContext();
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const handleSubmit = async (type) => {
    await submitForm();
  };

  const handleRestore = async (type) => {
    setValue(true);
    await submitForm();
  };

  const handleDelete = async (type) => {
    setValue(false);
    await submitForm();
  };

  return (
    <>
      {userData.id && !userData.active ? (
        <>
          <Box flexGrow={1.5} />
          <BlockIcon className={classes.warning} />
          <Typography
            variant="subtitle1"
            className={clsx(classes.uppercase, classes.warning)}
          >
            User inative
          </Typography>
          <Box flexGrow={1} />
          <Button
            disabled={isSubmitting}
            variant="outlined"
            onClick={() => handleRestore()}
          >
            Restore
            {isSubmitting && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </>
      ) : (
        <>
          <Button color="primary" onClick={handleCancel}>
            Cancel
          </Button>
          {values.id && (
            <>
              <Box flexGrow={1} />
              <Button
                color="primary"
                disabled={isSubmitting}
                onClick={() => handleDelete()}
              >
                Delete
                {isSubmitting && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Button>
            </>
          )}
          <Box flexGrow={1} />
          <Button
            color="primary"
            disabled={isSubmitting || !dirty}
            variant="outlined"
            onClick={() => handleSubmit()}
          >
            Save
            {isSubmitting && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </>
      )}
    </>
  );
};

Actions.propTypes = {
  dirty: PropTypes.bool,
  handleBlur: PropTypes.func,
  handleCancel: PropTypes.func,
  handleChange: PropTypes.func,
  isSubmitting: PropTypes.bool,
  name: PropTypes.string,
  userData: PropTypes.object,
  values: PropTypes.object,
};

export default Actions;
