import { Button, Container, makeStyles, Typography } from '@material-ui/core';
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
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState();

  const query = new URLSearchParams(location.search);
  const resetToken = query.get('token');
  // const email = query.get('username');

  useEffect(() => {
    if (state.session.isSignedIn || !resetToken) {
      navigate('/', { replace: true });
    }
    return () => {};
  }, []);

  const resetPassword = async (values) => {
    values = { ...values, resetToken };
    const result = await actions.users.resetPassword(values);
    if (result.error) setError(result.error);
    setRequestSent(true);
  };

  return (
    <Page className={classes.root} title="Set Password">
      <Container className={classes.container} maxWidth="xs">
        <Logo className={classes.logo} type="full" />
        <>
          {requestSent ? (
            <Typography color="textPrimary" component="h1" variant="body1">
              New password set. Visit the login page to sign in.
            </Typography>
          ) : (
            <>
              <Typography color="textPrimary" component="h1" variant="h6">
                Set Password
              </Typography>
              {error && (
                <ErrorMessage
                  message={`Sorry, it is not possible to set your password at this time.`}
                />
              )}
              <ResetPasswordForm resetPassword={resetPassword} />
            </>
          )}
          <Button
            className={classes.login}
            component={RouterLink}
            startIcon={<ArrowBackIcon />}
            to="/login"
          >
            Login
          </Button>
        </>
      </Container>
    </Page>
  );
};

export default ResetPasswordView;
