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

const useStyles = makeStyles(({ palette }) => ({
  submitButton: { color: palette.common.white },
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

const ForgotForm = ({ requestPassword }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={formValidation}
      onSubmit={async (values) => {
        await requestPassword(values);
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
              classes={{ containedPrimary: classes.submitButton }}
              color="primary"
              disabled={isSubmitting}
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Get New Password
              {isSubmitting && (
                <CircularProgress
                  className={classes.buttonProgress}
                  size={24}
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
  requestPassword: PropTypes.func,
};

export default ForgotForm;
