import {
  Box,
  Button,
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import Page from '../../components/Page';
import { useApp } from '../../overmind';
import ErrorMessage from './components/ErrorMessage';
import ForgotForm from './components/ForgotForm';

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
  logo: {
    marginBottom: theme.spacing(8),
    width: 256,
  },
  login: {
    marginTop: theme.spacing(4),
    color: theme.palette.secondary.main,
  },
}));

const ForgotView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState();

  const hasToken = actions.session.getUserToken();

  const authenticate = async (values) => {
    const result = await actions.users.forgotPassword(values);
    if (result.error) setError(result.error);
    setRequestSent(true);
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
        <Logo type="full" className={classes.logo} />
        {hasToken ? (
          <Box
            display="flex"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            {isAuthenticating && <CircularProgress size={60} thickness={4} />}
            {error && <ErrorMessage message={error} />}
          </Box>
        ) : (
          <>
            {requestSent ? (
              <Typography component="h1" variant="body1" color="textPrimary">
                Check your email for the confirmation link, then visit the login
                page.
              </Typography>
            ) : (
              <>
                <Typography component="h1" variant="body1" color="textPrimary">
                  Please enter your email address. You will receive an email
                  message with instructions on how to reset your password.
                </Typography>
                {error && (
                  <ErrorMessage message="Sorry, we do not recognize this account." />
                )}
                <ForgotForm
                  authenticate={authenticate}
                  setIsAuthenticating={setIsAuthenticating}
                />
              </>
            )}
            <Button
              component={RouterLink}
              to="/login"
              className={classes.login}
              startIcon={<ArrowBackIcon />}
            >
              Login
            </Button>
          </>
        )}
      </Container>
    </Page>
  );
};

export default ForgotView;
