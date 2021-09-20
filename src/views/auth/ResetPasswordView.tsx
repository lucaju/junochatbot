import { Container, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Logo from '@src/components/Logo';
import Page from '@src/components/Page';
import { useAppState, useActions } from '@src/overmind';
import type { Credential, ErrorMessage as ErrorMessageType } from '@src/types';
import { isError } from '@src/util/utilities';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import ErrorMessage from './components/ErrorMessage';
import ResetPasswordForm from './components/ResetPasswordForm';

const ResetPasswordView: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useAppState();
  const actions = useActions();
  const { t } = useTranslation();
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState<ErrorMessageType | undefined>();

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (session.isSignedIn || !resetToken) {
      navigate('/app', { replace: true });
    }
    return () => {};
  }, []);

  const query = new URLSearchParams(location.search);
  const resetToken = query.get('token');
  const fullName = `${query.get('firstname')} ${query.get('lastname')}`;
  const newUser = query.get('newUser') === 'true' ? true : false;

  const resetPassword = async (values: Credential) => {
    if (!values.password || !resetToken) return;
    const response = await actions.users.resetPassword({
      password: values.password,
      token: resetToken,
    });
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
      title="Set Password"
    >
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 8,
        }}
      >
        <Logo height={isSM ? 120 : 160} sx={{ mb: 8 }} type="full" />
        <>
          {requestSent ? (
            <Typography color="textPrimary" component="h1" variant="body1">
              {t('auth:passwordSet')}
            </Typography>
          ) : (
            <>
              {newUser ? (
                <>
                  <Typography component="h1" sx={{ textTransform: 'capitalize' }} variant="h6">
                    {t('common:welcome')} {fullName}
                  </Typography>
                  <Typography component="h2" gutterBottom variant="subtitle2">
                    {t('auth:mustSetPassowrd')}
                  </Typography>
                </>
              ) : (
                <Typography component="h1" variant="h6">
                  {`${t('auth:setupPasswordFor')} ${fullName}`}
                </Typography>
              )}
              {error && <ErrorMessage message={t('error:notPossibleSetPassword')} />}
              <ResetPasswordForm resetPassword={resetPassword} />
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
            {t('common:signin')}
          </Link>
        </>
      </Container>
    </Page>
  );
};

export default ResetPasswordView;
