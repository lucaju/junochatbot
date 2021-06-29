import { Box, CircularProgress, Container, Link, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import Logo from '@src/components/Logo';
import Page from '@src/components/Page';
import { useAppState, useActions } from '@src/overmind';
import type { Credential, ErrorMessage as ErrorMessageType } from '@src/types';
import { isError } from '@src/util/utilities';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ErrorMessage from './components/ErrorMessage';
import LoginForm from './components/LoginForm';

const LoginView: FC = () => {
  const navigate = useNavigate();
  const { session } = useAppState();
  const actions = useActions();
  const { t } = useTranslation(['auth', 'errorMessages']);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<ErrorMessageType | undefined>();
  const [hasToken, setHasToken] = useState(!!actions.session.getUserToken());

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (hasToken) authenticate();
    return () => {};
  }, []);

  useEffect(() => {
    if (session.isSignedIn) {
      navigate('/app', { replace: true });
    }
    return () => {};
  }, [session.isSignedIn]);

  const authenticate = async (credential?: Credential) => {
    setIsAuthenticating(true);
    const response = await actions.session.authenticate(credential);
    setIsAuthenticating(false);
    if (isError(response)) {
      setHasToken(false);
      const errorMessage = credential ? t('errorMessages:accontNotRecognized') : '';
      setError({ errorMessage });
    }
  };

  return (
    <Page title={t('signin')}>
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Logo height={isSM ? 120 : 160} sx={{ mb: 8 }} type="full" />
        {hasToken ? (
          <Box display="flex" height="100%" justifyContent="center" alignItems="center">
            <>
              {isAuthenticating && <CircularProgress size={60} thickness={4} />}
              {error && <ErrorMessage message={error.errorMessage} />}
            </>
          </Box>
        ) : (
          <>
            <Typography
              color="textPrimary"
              component="h1"
              sx={{ textTransform: 'capitalize' }}
              variant="h5"
            >
              {t('signin')}
            </Typography>
            {error && <ErrorMessage message={error.errorMessage} />}
            <LoginForm authenticate={authenticate} />
            <Box mt={2}>
              <Link
                component={RouterLink}
                sx={{ color: ({ palette }) => palette.text.disabled }}
                to="/forgot"
                variant="body2"
              >
                {`${t('forgotPassword')}?`}
              </Link>
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
};

export default LoginView;
