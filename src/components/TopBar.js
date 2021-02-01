import {
  AppBar,
  Avatar,
  Box,
  Button,
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
import Profile from './Profile';
// import Brightness4Icon from '@material-ui/icons/Brightness4';
// import Brightness7Icon from '@material-ui/icons/Brightness7';

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbarGutters: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  sideSpace: { width: 300 },
  logo: {
    maxHeight: 32,
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  rightMenu: { marginRight: theme.spacing(2) },
  avatar: {
    cursor: 'pointer',
    width: 32,
    height: 32,
  },
}));

const rightMenu = [
  {
    href: '/',
    title: 'Stories',
  },
  {
    href: '/users',
    title: 'Users',
    restricted: ['Admin', 'Instructor'],
  },
];

const TopBar = ({ className, handleMenuClick, storyEditMode, ...rest }) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const [anchorProfileEl, setAnchorProfileEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorProfileEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorProfileEl(null);
  };

  const handleClick = () => {
    actions.story.setCurrentStory(null);
  };

  return (
    <div>
      <AppBar
        color="inherit"
        className={clsx(classes.root, className)}
        elevation={0}
        {...rest}
      >
        <Toolbar
          classes={{
            gutters: classes.toolbarGutters,
          }}
        >
          <Box
            alignItems="center"
            justify="center"
            display="flex"
            flexDirection="row"
            className={classes.sideSpace}
          >
            {storyEditMode && (
              <IconButton color="inherit" onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
            )}
            <RouterLink to="/">
              <Logo type="simplified" className={classes.logo} />
            </RouterLink>
          </Box>
          <Box flexGrow={1} />
          <Typography component="h1" variant="h5" noWrap>
            {state.ui.title}
          </Typography>
          <Box flexGrow={1} />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            className={clsx(classes.sideSpace, classes.rightMenu)}
          >
            <Box className={classes.rightMenu}>
              {rightMenu.map((item) => {
                if (
                  item.restricted &&
                  !item.restricted.includes(state.session.user.roleType)
                )
                  return;
                return (
                  <Button
                    component={RouterLink}
                    key={item.title}
                    to={item.href}
                    onClick={handleClick}
                  >
                    {item.title}
                  </Button>
                );
              })}
              {/* <IconButton color="inherit" onClick={handleSwitchBrightness}>
                {state.ui.darkMode ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton> */}
            </Box>
            <Avatar
              className={classes.avatar}
              src={`/assets/users/images/${state.session.user.avatar}`}
              onClick={handleProfileClick}
            />
          </Box>
        </Toolbar>
        <Profile anchor={anchorProfileEl} handleClose={handleProfileClose} />
      </AppBar>
    </div>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  handleMenuClick: PropTypes.func,
  storyEditMode: PropTypes.bool,
};

export default TopBar;
