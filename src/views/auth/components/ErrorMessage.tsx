import { makeStyles, Typography } from '@material-ui/core';
import React, { FC } from 'react';

interface ErrorMessageProps {
  message: string;
}

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.error.dark,
    textAlign: 'center',
  },
}));

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  const classes = useStyles();
  return (
    <Typography component="h2" variant="subtitle1" className={classes.error}>
      {message}
    </Typography>
  );
};

export default ErrorMessage;
