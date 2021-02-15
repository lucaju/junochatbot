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
  password: Yup.string().max(255).required('Password is required'),
});

const ResetPasswordForm = ({ resetPassword }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{ password: '' }}
      validationSchema={formValidation}
      onSubmit={async (values) => {
        await resetPassword(values);
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
            autoComplete="current-password"
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="New Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
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
              Submit
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

ResetPasswordForm.propTypes = {
  resetPassword: PropTypes.func,
};

export default ResetPasswordForm;
