import { Container, Link, makeStyles, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '@src/components/Logo';
import Page from '@src/components/Page';
import { useApp } from '@src/overmind';
import ErrorMessage from './components/ErrorMessage';
import ForgotForm from './components/ForgotForm';
import { isError } from '@src/util/utilities';
import type { Credential, ErrorMessage as ErrorMessageType } from '@src/types';

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
    alignItems: 'center',
  },
  login: {
    marginTop: spacing(4),
    color: palette.text.hint
  },
  logo: {
    marginBottom: spacing(8),
    width: 256,
  },
}));

const ForgotView: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const { t } = useTranslation(['auth', 'errorMessages']);
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState<ErrorMessageType | undefined>();

  useEffect(() => {
    if (state.session.isSignedIn) navigate('/app', { replace: true });
    return () => {};
  }, []);

  const requestPassword = async (values: Credential) => {
    if (!values.email) return;
    const response = await actions.users.requestPassword(values.email);
    if (isError(response)) setError(response);
    setRequestSent(true);
  };

  return (
    <Page className={classes.root} title={t('forgotPassword')}>
      <Container className={classes.container} maxWidth="xs">
        <Logo className={classes.logo} type="full" />
        <>
          {requestSent ? (
            <Typography color="textPrimary" component="h1" variant="body1">
              {t('checkEmaiConfirmation')}
            </Typography>
          ) : (
            <>
              <Typography color="textPrimary" component="h1" variant="body1">
                {t('forgotMessage')}
              </Typography>
              {error && (
                <ErrorMessage
                  message={t('errorMessages:accontNotRecognized')}
                />
              )}
              <ForgotForm requestPassword={requestPassword} />
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

export default ForgotView;
