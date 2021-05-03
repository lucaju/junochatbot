import {
  Box,
  CircularProgress,
  Container,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '@src/components/Logo';
import Page from '@src/components/Page';
import { useApp } from '@src/overmind';
import type { Credential, ErrorMessage as ErrorMessageType } from '@src/types';
import { isError } from '@src/util/utilities';
import ErrorMessage from './components/ErrorMessage';
import LoginForm from './components/LoginForm';

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    backgroundColor: palette.background.default,
    height: '100%',
    paddingBottom: spacing(3),
    paddingTop: spacing(3),
  },
  capitalize: { textTransform: 'capitalize' },
  container: {
    marginTop: spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  forgot: { color: palette.text.hint },
  logo: {
    marginBottom: spacing(8),
    width: 400,
  },
}));

const LoginView: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const { t } = useTranslation(['auth', 'errorMessages']);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<ErrorMessageType | undefined>();
  const [hasToken, setHasToken] = useState(!!actions.session.getUserToken());

  useEffect(() => {
    if (hasToken) authenticate();
    return () => {};
  }, []);

  useEffect(() => {
    if (state.session.isSignedIn) {
      navigate('/app', { replace: true });
    }
  }, [state.session.isSignedIn]);

  const authenticate = async (credential?: Credential) => {
    setIsAuthenticating(true);
    const response = await actions.session.authenticate(credential);
    setIsAuthenticating(false);
    if (isError(response)) {
      setHasToken(false);
      const errorMessage = credential
        ? t('errorMessages:accontNotRecognized')
        : '';
      setError({ errorMessage });
    }
  };

  return (
    <Page title={t('signin')}>
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
              {error && <ErrorMessage message={error.errorMessage} />}
            </>
          </Box>
        ) : (
          <>
            <Typography
              className={classes.capitalize}
              color="textPrimary"
              component="h1"
              variant="h5"
            >
              {t('signin')}
            </Typography>
            {error && <ErrorMessage message={error.errorMessage} />}
            <LoginForm authenticate={authenticate} />
            <Link
              className={classes.forgot}
              component={RouterLink}
              to="/forgot"
              variant="body2"
            >
              {`${t('forgotPassword')}?`}
            </Link>
          </>
        )}
      </Container>
    </Page>
  );
};

export default LoginView;
