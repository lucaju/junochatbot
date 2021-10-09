import { AppBar, Box, Button, colors, Stack, Toolbar, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Logo from '@src/components/Logo';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LanguageMenu from './LanguageMenu';

const Topbar: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        color="secondary"
        elevation={0}
        sx={{
          backgroundColor:
            theme.palette.mode === 'dark'
              ? alpha(colors.deepPurple[900], 0.8)
              : alpha(colors.lightBlue[100], 0.8),
        }}
      >
        <Toolbar variant="dense">
          <RouterLink to="/">
            <Logo height={24} sx={{ ml: 1, mt: 1 }} type="simplified" />
          </RouterLink>
          <Box flexGrow={1} />
          <Stack direction="row" spacing={2}>
            <LanguageMenu />
            <Button color="inherit" onClick={() => navigate('/login', { replace: true })}>
              {t('home:signin')}
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Topbar;
