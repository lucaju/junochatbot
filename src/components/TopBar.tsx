import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { APP_URL } from '@src/config/config.js';
import { useAppState } from '@src/overmind';
import React, { FC, MouseEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Logo from './Logo';
import Profile from './profile/Profile';

interface TopBarProps {
  appMode: boolean;
  handleMenuClick: () => void;
}

const TopBar: FC<TopBarProps> = ({ appMode, handleMenuClick }) => {
  const { session, story, ui } = useAppState();
  const [anchorProfileEl, setAnchorProfileEl] = useState<HTMLDivElement | undefined>();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleProfileClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorProfileEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorProfileEl(undefined);
  };

  return (
    <div>
      <AppBar color="inherit" elevation={0}>
        <Toolbar sx={{ px: '12px !important', pr: '8px !important' }}>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <>
              {session.isStudent && story.stories.length === 0 ? (
                ''
              ) : (
                <IconButton color="inherit" onClick={handleMenuClick}>
                  <MenuIcon />
                </IconButton>
              )}
              {!isMobile && (
                <RouterLink to="/">
                  <Logo height={32} sx={{ ml: 1, mt: 1 }} type="simplified" />
                </RouterLink>
              )}
            </>
          </Box>
          <Box flexGrow={1} />
          <Typography component="h1" noWrap sx={{ textTransform: 'capitalize' }} variant="h5">
            {ui.pageTitle !== 'stories'
              ? ui.pageTitle
              : story.stories.length > 0
              ? ui.pageTitle
              : ''}
          </Typography>
          <Box flexGrow={1} />
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            mr={2}
          >
            {session.user && (
              <Avatar
                onClick={handleProfileClick}
                src={session.user.avatarUrl && `${APP_URL}/uploads/assets${session.user.avatarUrl}`}
                sx={{
                  height: 32,
                  width: 32,
                  cursor: 'pointer',
                }}
              >
                {!session.user.avatarUrl && <AccountCircleIcon />}
              </Avatar>
            )}
          </Box>
        </Toolbar>
        {anchorProfileEl && <Profile anchor={anchorProfileEl} handleClose={handleProfileClose} />}
      </AppBar>
    </div>
  );
};

export default TopBar;
