import {
  AppBar,
  Box,
  Button,
  colors,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LanguageMenu from './LanguageMenu';

const Topbar: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleNavigateToLogin = () => {
    navigate('/login', { replace: true });
  };

  const openSideBar = () => setSideBarOpen(true);
  const closeSideBar = () => setSideBarOpen(false);

  const fullMenu = () => {
    return (
      <>
        <Button color="inherit" href="#about">
          {t('home:about')}
        </Button>
        <Button color="inherit" href="#stories">
          {t('home:stories')}
        </Button>
        <Button color="inherit" href="#pedagogical">
          {t('home:pedagogicalMaterial')}
        </Button>
        <Button color="inherit" href="#activities">
          {t('home:researchActivities')}
        </Button>
        <Button color="inherit" href="#team">
          {t('home:team')}
        </Button>
        <Button color="inherit" href="#sponsors">
          {t('home:sponsors')}
        </Button>
      </>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        color="secondary"
        elevation={0}
        position="fixed"
        sx={{
          backgroundColor:
            theme.palette.mode === 'dark'
              ? alpha(colors.deepPurple[900], 0.8)
              : alpha(colors.lightBlue[100], 0.8),
        }}
      >
        <Drawer anchor="left" open={sideBarOpen} onClose={closeSideBar}>
          <Stack
            role="presentation"
            alignItems="flex-end"
            p={1}
            mt={2}
            sx={{ width: 250 }}
            onClick={closeSideBar}
            onKeyDown={closeSideBar}
          >
            {fullMenu()}
          </Stack>
        </Drawer>
        <Toolbar variant="dense">
          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={openSideBar}
              >
                <MenuIcon sx={{ mr: 2 }} />
              </IconButton>
              <LanguageMenu />
            </>
          ) : (
            <>
              {fullMenu()}
              <LanguageMenu />
            </>
          )}

          <Box flexGrow={1} />
          <Button color="inherit" onClick={handleNavigateToLogin}>
            {t('home:signin')}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Topbar;
