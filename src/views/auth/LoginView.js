import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from 'src/components/Logo';
import Page from 'src/components/Page';
import * as Yup from 'yup';
import { useApp } from 'src/overmind';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    marginBottom: theme.spacing(4),
    width: 256,
  },
  buttonProgress: {
    position: 'absolute',
    marginLeft: '45%',
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const [isAuthenticating, setIsAuthenticating] = useState(null);

  const hasToken = actions.session.getUserToken();

  const authenticate = async (values) => {
    await actions.session.authenticate(values);
  };

  useEffect(() => {
    if (state.session.isSignedIn) navigate('/', { replace: true });
    if (hasToken) {
      setIsAuthenticating(true);
      const token = actions.session.getUserToken();
      authenticate({ token });
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (state.session.isSignedIn) {
      setIsAuthenticating(false);
      navigate('/', { replace: true });
    }
  }, [state.session.isSignedIn]);

  return (
    <Page className={classes.root} title="Login">
      <Container maxWidth="xs" className={classes.container}>
        <Logo className={classes.logo} />

        {hasToken ? (
          <Box
            display="flex"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            {isAuthenticating && (
              <CircularProgress
                className={classes.spinner}
                size={60}
                thickness={4}
              />
            )}
          </Box>
        ) : (
          <>
            <Typography component="h1" variant="h5" color="textPrimary">
              Sign in
            </Typography>
            <Formik
              initialValues={{
                email: 'lucaju@gmail.com',
                password: 'password',
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email')
                  .max(255)
                  .required('Email is required'),
                password: Yup.string()
                  .max(255)
                  .required('Password is required'),
              })}
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
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
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
                    variant="outlined"
                  />
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
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
                  <Link component={RouterLink} to="/register" variant="body1">
                    Forgot password?
                  </Link>
                </form>
              )}
            </Formik>
          </>
        )}
      </Container>
    </Page>
  );
};

export default LoginView;
