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
  groupData,
  handleCancel,
  handleDelete,
  isSubmitting,
  values,
}) => {
  const classes = useStyles();
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
      {groupData.id && !groupData.active ? (
        <>
          <Button color="primary" onClick={handleCancel}>
            Cancel
          </Button>
          <Box flexGrow={1} />
          <BlockIcon className={classes.warning} />
          <Typography
            className={clsx(classes.uppercase, classes.warning)}
            variant="subtitle1"
          >
            Group inative
          </Typography>
          <Box flexGrow={1} />
          <Button
            disabled={isSubmitting}
            onClick={() => handleRestore('restore')}
            variant="outlined"
          >
            Restore
            {isSubmitting && buttonClicked === 'restore' && (
              <CircularProgress className={classes.progress} size={24} />
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
                onClick={() => handleDelete('delete')}
              >
                Delete
                {isSubmitting && buttonClicked === 'delete' && (
                  <CircularProgress className={classes.progress} size={24} />
                )}
              </Button>
            </>
          )}
          <Box flexGrow={1} />
          <Button
            color="primary"
            disabled={isSubmitting || !dirty}
            onClick={() => handleSubmit('submit')}
            variant="outlined"
          >
            Save
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
  groupData: PropTypes.object,
  handleCancel: PropTypes.func,
  handleDelete: PropTypes.func,
  isSubmitting: PropTypes.bool,
  values: PropTypes.object,
};

export default Actions;
