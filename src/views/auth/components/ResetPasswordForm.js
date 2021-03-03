import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as Yup from 'yup';

const useStyles = makeStyles(({ palette }) => ({
  submitButton: { color: palette.common.white },
  progress: {
    position: 'absolute',
    marginLeft: '45%',
  },
}));

const formValidation = Yup.object().shape({
  password: Yup.string()
    .min(8)
    .max(255)
    .matches(/^(?=.{8,}$)(?=(?:.*[0-9]){2}).*/)
    .required(
      'Password must have at least 8 characters and contain at least 2 numbers'
    ),
});

const ResetPasswordForm = ({ newUser, resetPassword }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

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
          <FormControl fullWidth>
            <InputLabel htmlFor="password">{!newUser && 'New '}Password</InputLabel>
            <Input
              autoComplete="new-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              error={Boolean(touched.password && errors.password)}
              id="password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              value={values.password}
            />
          </FormControl>
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
                <CircularProgress className={classes.progress} size={24} />
              )}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

ResetPasswordForm.propTypes = {
  newUser: PropTypes.bool,
  resetPassword: PropTypes.func,
};

export default ResetPasswordForm;
