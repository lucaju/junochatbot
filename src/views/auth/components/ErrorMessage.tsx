import { Typography } from '@mui/material';
import React, { FC } from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => (
  <Typography
    component="h2"
    variant="subtitle1"
    sx={{
      color: 'error.dark',
      textAlign: 'center',
    }}
  >
    {message}
  </Typography>
);

export default ErrorMessage;
