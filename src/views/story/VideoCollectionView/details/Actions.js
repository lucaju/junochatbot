/* eslint-disable no-unused-vars */
import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles(() => ({
  buttonProgress: { position: 'absolute' },
}));

const Actions = ({
  dirty,
  handleCancel,
  handleDelete,
  isSubmitting,
  name,
  userId,
}) => {
  const classes = useStyles();
  const { submitForm } = useFormikContext();
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  const [pushedButton, setPushedButton] = useState(null);

  const handleSubmit = async (type) => {
    setPushedButton(type);
    setValue(type);
    await submitForm();
    setPushedButton(null);
  };

  return (
    <>
      {userId !== 0 && (
        <>
          <Button color="default" onClick={handleDelete}>
            Delete
          </Button>
          <Box flexGrow={1} />
        </>
      )}
      <Button color="primary" onClick={handleCancel}>
        Cancel
      </Button>
      <Box flexGrow={1} />
      <Button
        color="primary"
        disabled={isSubmitting || !dirty}
        variant="outlined"
        onClick={() => handleSubmit('submit')}
      >
        Save
        {isSubmitting && pushedButton === 'submit' && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Button>
    </>
  );
};

Actions.propTypes = {
  dirty: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleDelete: PropTypes.func,
  isSubmitting: PropTypes.bool,
  name: PropTypes.string,
  userId: PropTypes.number,
};

export default Actions;
