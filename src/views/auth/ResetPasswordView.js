import { Container, Link, makeStyles, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import Page from '../../components/Page';
import { useApp } from '../../overmind';
import ErrorMessage from './components/ErrorMessage';
import ResetPasswordForm from './components/ResetPasswordForm';

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

const ResetPasswordView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { state, actions } = useApp();
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState();

  const query = new URLSearchParams(location.search);
  const resetToken = query.get('token');

  useEffect(() => {
    if (state.session.isSignedIn || !resetToken) {
      navigate('/app', { replace: true });
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

export default ResetPasswordView;
