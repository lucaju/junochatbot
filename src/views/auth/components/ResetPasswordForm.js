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
  password: Yup.string().max(255).required('Password is required'),
});

const ResetPasswordForm = ({ authenticate, setIsAuthenticating }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{ password: '' }}
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
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disableElevation
              classes={{ containedPrimary: classes.submitButton }}
            >
              Submit
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

ResetPasswordForm.propTypes = {
  authenticate: PropTypes.func,
  setIsAuthenticating: PropTypes.func,
};

export default ResetPasswordForm;
