import { Container, Link, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Logo from '@src/components/Logo';
import Page from '@src/components/Page';
import { useAppState, useActions } from '@src/overmind';
import type { Credential, ErrorMessage as ErrorMessageType } from '@src/types';
import { isError } from '@src/util/utilities';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ErrorMessage from './components/ErrorMessage';
import ForgotForm from './components/ForgotForm';

const ForgotView: FC = () => {
  const navigate = useNavigate();
  const { session } = useAppState();
  const actions = useActions();
  const { t } = useTranslation(['auth', 'errorMessages']);
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState<ErrorMessageType | undefined>();

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (session.isSignedIn) navigate('/app', { replace: true });
    return () => {};
  }, []);

  const requestPassword = async (values: Credential) => {
    if (!values.email) return;
    const response = await actions.users.requestPassword(values.email);
    if (isError(response)) setError(response);
    setRequestSent(true);
  };

  return (
    <Page
      sx={{
        height: '100%',
        py: 3,
        backgroundColor: 'background.default',
      }}
      title={t('forgotPassword')}
    >
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
              {error && <ErrorMessage message={t('errorMessages:accontNotRecognized')} />}
              <ForgotForm requestPassword={requestPassword} />
            </>
          )}
          <Link
            component={RouterLink}
            sx={{
              mt: 4,
              color: ({ palette }) => palette.text.disabled,
              textTransform: 'capitalize',
            }}
            to="/login"
            variant="body2"
          >
            <ArrowBackIcon fontSize="small" sx={{ mb: -0.5, mt: 0.5, mr: 2 }} />
            {t('signin')}
          </Link>
        </>
      </Container>
    </Page>
  );
};

export default ForgotView;
