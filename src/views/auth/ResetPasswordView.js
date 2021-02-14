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
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import Page from '../../components/Page';
import { useApp } from '../../overmind';
import ErrorMessage from './components/ErrorMessage';
import ResetPasswordForm from './components/ResetPasswordForm';

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

const ResetPasswordView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { state, actions } = useApp();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState();

  const query = new URLSearchParams(location.search);
  const resetToken = query.get('token');

  let action = location.pathname.slice(1);
  action = action === 'newuser' ? 'create' : 'reset';

  const hasToken = actions.session.getUserToken();

  const authenticate = async (values) => {
    values = { ...values, resetToken };
    const result = await actions.users.resetPassword(values);
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
                New password set. Visit the login page to sign in.
              </Typography>
            ) : (
              <>
                <Typography component="h1" variant="h6" color="textPrimary">
                  {action} password
                </Typography>
                {error && (
                  <ErrorMessage
                    message={`Sorry, it is not possible to ${action} your password at this time.`}
                  />
                )}
                <ResetPasswordForm
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

export default ResetPasswordView;
