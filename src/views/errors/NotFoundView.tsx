import { Box, Container, Typography } from '@mui/material';
import Logo from '@src/components/Logo';
import Page from '@src/components/Page';
import React, { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundView: FC = () => {
  const { t } = useTranslation();

  return (
    <Page
      sx={{
        backgroundColor: 'background.default',
        height: '100%',
        py: 3,
      }}
      title={t('error:pageNotFound')}
    >
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 4,
          }}
        >
          <RouterLink to="/">
            <Logo
              sx={{
                width: 300,
                mb: 8,
              }}
              type="full"
            />
          </RouterLink>
          <Typography align="center" sx={{ color: 'text.primary' }} variant="h4">
            {t('error:title404')}
          </Typography>
          <Typography align="center" sx={{ color: 'text.primary' }} variant="subtitle2">
            <Trans i18nKey="error:message404">
              You either tried some shady route or you came here by mistake. Go back to the{' '}
              <RouterLink to="/">main page.</RouterLink>
            </Trans>
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              src="/assets/images/undraw_not_found_60pq.svg"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 560,
                marginTop: 50,
              }}
            />
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default NotFoundView;
