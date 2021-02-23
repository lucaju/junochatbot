import { Container, Link, makeStyles, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import Page from '../../components/Page';
import { useApp } from '../../overmind';
import ErrorMessage from './components/ErrorMessage';
import ForgotForm from './components/ForgotForm';

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    backgroundColor: palette.background.default,
    height: '100%',
    paddingBottom: spacing(3),
    paddingTop: spacing(3),
  },
  backArrowIcon: {
    marginBottom: -spacing(0.5),
    marginRight: spacing(0.5),
  },
  container: {
    marginTop: spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  login: {
    marginTop: spacing(4),
    color: palette.secondary.main,
  },
  logo: {
    marginBottom: spacing(8),
    width: 256,
  },
}));

const ForgotView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (state.session.isSignedIn) navigate('/app', { replace: true });
    return () => {};
  }, []);

  const requestPassword = async (values) => {
    const result = await actions.users.requestPassword(values);
    if (result.error) setError(result.error);
    setRequestSent(true);
  };

  return (
    <Page className={classes.root} title="Login">
      <Container className={classes.container} maxWidth="xs">
        <Logo className={classes.logo} type="full" />
        <>
          {requestSent ? (
            <Typography color="textPrimary" component="h1" variant="body1">
              Check your email for the confirmation link, then visit the login
              page.
            </Typography>
          ) : (
            <>
              <Typography color="textPrimary" component="h1" variant="body1">
                Please enter your email address. You will receive an email
                message with instructions on how to reset your password.
              </Typography>
              {error && (
                <ErrorMessage message="Sorry, we do not recognize this account." />
              )}
              <ForgotForm requestPassword={requestPassword} />
            </>
          )}
          <Link
            className={classes.login}
            component={RouterLink}
            to="/login"
            variant="body2"
          >
            <ArrowBackIcon className={classes.backArrowIcon} fontSize="small" />
            LOGIN
          </Link>
        </>
      </Container>
    </Page>
  );
};

export default ForgotView;
