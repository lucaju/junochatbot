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
  submitButton: { color: '#FFFFFF' },
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
  password: Yup.string().max(255).required('Password is required'),
});

const LoginForm = ({ authenticate, setIsAuthenticating }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
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
          <TextField
            autoComplete="current-password"
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
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
              Sign in
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

LoginForm.propTypes = {
  authenticate: PropTypes.func,
  setIsAuthenticating: PropTypes.func,
};

export default LoginForm;
