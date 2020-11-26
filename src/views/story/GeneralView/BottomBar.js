import {
  Box,
  Button,
  CircularProgress,
  Divider,
  makeStyles,
} from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  bar: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  divider: {
    paddingLeft: theme.spacing(2),
    paddingright: theme.spacing(2),
  },
  buttonProgress: { position: 'absolute' },
  marginLeft: { marginLeft: theme.spacing(2) },
}));

const BottomBar = ({
  dirty,
  handleDelete,
  isSubmitting,
  name,
  submitSuccess,
}) => {
  const classes = useStyles();
  const { values, submitForm } = useFormikContext();
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  const [status, setStatus] = useState(false);
  const [pushedButton, setPushedButton] = useState(null);

  useEffect(() => {
    setStatus(value);
    return () => {};
  }, []);

  useEffect(() => {
    if (submitSuccess) setStatus(value);
  }, [submitSuccess]);

  const handleSubmit = async (type) => {
    setPushedButton(type);
    if (type === 'draft') setValue(false);
    if (type === 'publish') setValue(true);
    await submitForm();
    setPushedButton(null);
  };

  return (
    <>
      <Divider className={classes.divider} />
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        className={classes.bar}
      >
        <Button color="default" disabled={isSubmitting} onClick={handleDelete}>
          Delete Story
        </Button>
        <Box flexGrow={1} />
        <Button
          color="primary"
          disabled={isSubmitting || !dirty}
          onClick={() => handleSubmit('draft')}
          variant={status ? 'text' : 'outlined'}
        >
          {status ? 'Switch to Draft' : 'Save draft'}
          {isSubmitting && pushedButton === 'draft' && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>

        <Button
          color="primary"
          disabled={isSubmitting || !dirty}
          onClick={() => handleSubmit('publish')}
          variant="contained"
          className={classes.marginLeft}
        >
          {status ? 'Update' : 'Publish'}
          {isSubmitting && pushedButton === 'publish' && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
      </Box>
    </>
  );
};

BottomBar.propTypes = {
  dirty: PropTypes.bool,
  handleDelete: PropTypes.func,
  isSubmitting: PropTypes.bool,
  name: PropTypes.string,
  submitSuccess: PropTypes.bool,
};

export default BottomBar;
