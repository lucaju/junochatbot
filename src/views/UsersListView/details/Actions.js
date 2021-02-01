/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  makeStyles,
  Switch,
} from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(() => ({
  buttonProgress: { position: 'absolute' },
}));

const Actions = ({
  dirty,
  handleBlur,
  handleCancel,
  handleChange,
  isSubmitting,
  // name,
  // userData,
  values,
}) => {
  const classes = useStyles();
  const { submitForm } = useFormikContext();
  // const [field, meta, helpers] = useField(name);
  // const { value } = meta;
  // const { setValue } = helpers;

  const handleSubmit = async (type) => {
    // setValue(type);
    await submitForm();
  };

  return (
    <>
      <FormControlLabel
        value={values.active}
        control={
          <Switch
            color="primary"
            checked={values.active}
            disabled={!values.id || values.roleTypeId === 1}
            label="Aa"
            name="active"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
          />
        }
        label="Active"
        labelPlacement="start"
      />

      <Box flexGrow={1} />

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
        {isSubmitting && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Button>
    </>
  );
};

Actions.propTypes = {
  dirty: PropTypes.bool,
  handleBlur: PropTypes.func,
  handleCancel: PropTypes.func,
  handleChange: PropTypes.func,
  isSubmitting: PropTypes.bool,
  // name: PropTypes.string,
  // userData: PropTypes.object,
  values: PropTypes.object,
};

export default Actions;
