import {
  Box,
  CircularProgress,
  Container,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import Page from '../../components/Page';
import { useApp } from '../../overmind';
import ErrorMessage from './components/ErrorMessage';
import LoginForm from './components/LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
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
  forgot: { color: theme.palette.secondary.main },
  logo: {
    marginBottom: theme.spacing(8),
    width: 400,
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState();
  const [hasToken, setHasToken] = useState(actions.session.getUserToken());

  const authenticate = async (values) => {
    let response;
    if (hasToken) {
      const token = actions.session.getUserToken();
      response = await actions.session.getUserDetails(token);
    } else {
      response = await actions.session.authenticate(values);
    }
    if (response.error) {
      setError(response.error);
      setIsAuthenticating(false);
      setHasToken(false);
    }
  };

  useEffect(() => {
    if (hasToken) {
      setIsAuthenticating(true);
      authenticate();
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (state.session.isSignedIn) {
      setIsAuthenticating(false);
      navigate('/app', { replace: true });
    }
  }, [state.session.isSignedIn]);

  return (
    <Page className={classes.root} title="Login">
      <Container className={classes.container} maxWidth="xs">
        <Logo className={classes.logo} type="full" />
        {hasToken ? (
          <Box
            display="flex"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <>
              {isAuthenticating && <CircularProgress size={60} thickness={4} />}
              {error && <ErrorMessage message={error.statusText} />}
            </>
          </Box>
        ) : (
          <>
            <Typography color="textPrimary" component="h1" variant="h5" >
              Sign in
            </Typography>
            {error && (
              <ErrorMessage message="Sorry, we do not recognize this account." />
            )}
            <LoginForm
              authenticate={authenticate}
              setIsAuthenticating={setIsAuthenticating}
            />
            <Link
              className={classes.forgot}
              component={RouterLink}
              to="/forgot"
              variant="body2"
            >
              Forgot password?
            </Link>
          </>
        )}
      </Container>
    </Page>
  );
};

export default LoginView;
