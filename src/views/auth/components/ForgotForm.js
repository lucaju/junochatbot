import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  submitButton: { color: theme.palette.common.white },
  buttonProgress: {
    position: 'absolute',
    marginLeft: '45%',
  },
}));

const formValidation = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
});

const ForgotForm = ({ authenticate, setIsAuthenticating }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={formValidation}
      onSubmit={async (values) => {
        setIsAuthenticating(true);
        await authenticate(values);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            autoComplete="username"
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
          />
          <Box my={2}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disableElevation
              classes={{ containedPrimary: classes.submitButton }}
            >
              Get New Password
              {isSubmitting && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

ForgotForm.propTypes = {
  authenticate: PropTypes.func,
  setIsAuthenticating: PropTypes.func,
};

export default ForgotForm;
