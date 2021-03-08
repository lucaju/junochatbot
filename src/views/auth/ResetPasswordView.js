import { Container, Link, makeStyles, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  capitalize: { textTransform: 'capitalize' },
  container: {
    marginTop: spacing(8),
    display: 'flex',
    flexDirection: 'column',
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
  const { t } = useTranslation(['auth', 'common', 'errorMessages']);
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (state.session.isSignedIn || !resetToken) {
      navigate('/app', { replace: true });
    }
    return () => {};
  }, []);

  const query = new URLSearchParams(location.search);
  const resetToken = query.get('token');
  const fullName = `${query.get('firstName')} ${query.get('lastName')}`;
  let newUser = query.get('newUser');
  newUser = newUser === 'true' ? true : false;

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
              {t('passwordSet')}
            </Typography>
          ) : (
            <>
              {newUser ? (
                <>
                  <Typography
                    className={classes.capitalize}
                    component="h1"
                    variant="h6"
                  >
                    {t('common:welcome')} {fullName}
                  </Typography>
                  <Typography component="h2" gutterBottom variant="subtitle2">
                    {t('mustSetPassowrd')}
                  </Typography>
                </>
              ) : (
                <Typography component="h1" variant="h6">
                  {`${t('setupPasswordFor')} ${fullName}`}
                </Typography>
              )}
              {error && (
                <ErrorMessage
                  message={t('errorMessages:notPossibleSetPassword')}
                />
              )}
              <ResetPasswordForm
                newUser={newUser}
                resetPassword={resetPassword}
              />
            </>
          )}
          <Link
            className={clsx(classes.login, classes.capitalize)}
            component={RouterLink}
            to="/login"
            variant="body2"
          >
            <ArrowBackIcon className={classes.backArrowIcon} fontSize="small" />
            {t('signin')}
          </Link>
        </>
      </Container>
    </Page>
  );
};

export default ResetPasswordView;
