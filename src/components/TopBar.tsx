import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { FC, MouseEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { APP_URL } from '@src/config/config.js';
import { useApp } from '@src/overmind';
import Logo from './Logo';
import Profile from './profile/Profile';

interface TopBarProps {
  appMode: boolean;
  handleMenuClick: () => void;
  className?: string;
}

const useStyles = makeStyles(({ spacing }) => ({
  root: {},
  avatar: {
    cursor: 'pointer',
    height: 32,
    width: 32,
  },
  logo: {
    maxHeight: 32,
    marginLeft: spacing(2),
    marginTop: spacing(1),
  },
  marginRight: { marginRight: spacing(2) },
  title: { textTransform: 'capitalize' },
  toolbarGutters: {
    paddingLeft: spacing(1.5),
    paddingRight: spacing(1.5),
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
  },
  sideSpace: { width: 300 },
}));

const TopBar: FC<TopBarProps> = ({ appMode, handleMenuClick, ...rest }) => {
  const classes = useStyles();
  const { state } = useApp();
  const [anchorProfileEl, setAnchorProfileEl] = useState<
    HTMLDivElement | undefined
  >();

  const handleProfileClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorProfileEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorProfileEl(undefined);
  };

  return (
    <div>
      <AppBar
        color="inherit"
        className={clsx(classes.root, rest.className)}
        elevation={0}
        {...rest}
      >
        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            {appMode && (
              <IconButton color="inherit" onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
            )}
            <RouterLink to="/">
              <Logo className={classes.logo} type="simplified" />
            </RouterLink>
          </Box>
          <Box flexGrow={1} />
          <Typography
            className={classes.title}
            component="h1"
            noWrap
            variant="h5"
          >
            {state.ui.pageTitle}
          </Typography>
          <Box flexGrow={1} />
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            className={classes.marginRight}
          >
            {state.session.user && (
              <Avatar
                className={classes.avatar}
                onClick={handleProfileClick}
                src={
                  state.session.user.avatarUrl &&
                  `${APP_URL}/uploads/assets${state.session.user.avatarUrl}`
                }
              >
                {!state.session.user.avatarUrl && <AccountCircleIcon />}
              </Avatar>
            )}
          </Box>
        </Toolbar>
        {anchorProfileEl && (
          <Profile anchor={anchorProfileEl} handleClose={handleProfileClose} />
        )}
      </AppBar>
    </div>
  );
};

export default TopBar;
