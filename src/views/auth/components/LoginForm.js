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
  TextField,
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
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup.string().max(255).required('Password is required'),
});

const LoginForm = ({ authenticate, setIsAuthenticating }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

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
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
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
              Sign in
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

LoginForm.propTypes = {
  authenticate: PropTypes.func,
  setIsAuthenticating: PropTypes.func,
};

export default LoginForm;
