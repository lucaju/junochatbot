import MenuIcon from '@mui/icons-material/Menu';
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
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useAppState } from '@src/overmind';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LanguageMenu from './LanguageMenu';

interface TopbarProps {
  onAnchor: (anchorName?: string) => void;
}

const Topbar: FC<TopbarProps> = ({ onAnchor }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { chat } = useAppState();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [sideBarOpen, setSideBarOpen] = useState(false);

  const openSideBar = () => setSideBarOpen(true);
  const closeSideBar = () => setSideBarOpen(false);

  const FullMenu = () => (
    <>
      <Button color="inherit" onClick={() => onAnchor('about')}>
        {t('home:about')}
      </Button>
      {chat.stories.length > 0 && (
        <Button color="inherit" onClick={() => onAnchor('stories')}>
          {t('home:stories')}
        </Button>
      )}
      <Button color="inherit" onClick={() => onAnchor('pedagogical')}>
        {t('home:pedagogicalMaterial')}
      </Button>
      <Button color="inherit" onClick={() => onAnchor('activities')}>
        {t('home:researchActivities')}
      </Button>
      <Button color="inherit" onClick={() => onAnchor('team')}>
        {t('home:team')}
      </Button>
      <Button color="inherit" onClick={() => onAnchor('sponsors')}>
        {t('home:sponsors')}
      </Button>
    </>
  );

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
            <FullMenu />
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
            </>
          ) : (
            <FullMenu />
          )}

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
