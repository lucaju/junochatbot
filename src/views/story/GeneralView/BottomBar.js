import {
  Box,
  Button,
  CircularProgress,
  Divider,
  makeStyles,
} from '@material-ui/core';
import { useFormikContext } from 'formik';
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

const BottomBar = ({ dirty, handleDelete, isSubmitting, submitSuccess }) => {
  const classes = useStyles();
  const { values, submitForm } = useFormikContext();
  const [status, setStatus] = useState(false);
  const [pushedButton, setPushedButton] = useState(null);

  useEffect(() => {
    setStatus(values.general.published);
    return () => {};
  }, []);

  useEffect(() => {
    if (submitSuccess) setStatus(values.general.published);
  }, [submitSuccess]);

  const handleSubmit = async (type) => {
    setPushedButton(type);
    if (type === 'draft') values.general.published = false;
    if (type === 'publish') values.general.published = true;
    await submitForm();
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
        <Button color="default" onClick={handleDelete}>
          Delete Story
        </Button>
        <Box flexGrow={1} />
        <Button
          color="primary"
          disabled={isSubmitting || !dirty}
          // type="submit"
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
          // type="submit"
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
  submitSuccess: PropTypes.bool,
};

export default BottomBar;
