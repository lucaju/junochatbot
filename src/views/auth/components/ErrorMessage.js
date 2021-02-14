import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.error.dark,
    textAlign: 'center',
  },
}));

const ErrorMessage = ({ message }) => {
  const classes = useStyles();
  return (
    <Typography component="h2" variant="subtitle1" className={classes.error}>
      {message}
    </Typography>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
