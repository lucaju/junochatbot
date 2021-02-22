import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useApp } from 'src/overmind';
import Logo from './Logo';
import Profile from './profile/Profile';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { APP_URL } from '../config/config.js';

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
  toolbarGutters: {
    paddingLeft: spacing(1.5),
    paddingRight: spacing(1.5),
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
  },
  sideSpace: { width: 300 },
}));

const TopBar = ({ appMode, className, handleMenuClick, ...rest }) => {
  const classes = useStyles();
  const { state } = useApp();
  const [anchorProfileEl, setAnchorProfileEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorProfileEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorProfileEl(null);
  };

  return (
    <div>
      <AppBar
        color="inherit"
        className={clsx(classes.root, className)}
        elevation={0}
        {...rest}
      >
        <Toolbar classes={{ gutters: classes.toolbarGutters }}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justify="center"
            // className={classes.sideSpace}
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
          <Typography component="h1" noWrap variant="h5">
            {state.ui.title}
          </Typography>
          <Box flexGrow={1} />
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            className={classes.marginRight}
          >
            <Avatar
              className={classes.avatar}
              onClick={handleProfileClick}
              src={
                state.session.user.avatarUrl &&
                // `/uploads/assets${state.session.user.avatarUrl}`
                `${APP_URL}/uploads/assets${state.session.user.avatarUrl}`
              }
            >
              {!state.session.user.avatarUrl && <AccountCircleIcon />}
            </Avatar>
          </Box>
        </Toolbar>
        <Profile anchor={anchorProfileEl} handleClose={handleProfileClose} />
      </AppBar>
    </div>
  );
};

TopBar.propTypes = {
  appMode: PropTypes.bool,
  className: PropTypes.string,
  handleMenuClick: PropTypes.func,
};

export default TopBar;
