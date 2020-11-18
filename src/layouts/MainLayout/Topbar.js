import React, { useState } from 'react';
import { useApp } from 'src/overmind';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Logo from 'src/components/Logo';
import Profile from 'src/components/Profile';

const useStyles = makeStyles((theme) => ({
  root: {},
  logo: {
    width: 128,
  },
  leftMenu: {
    marginLeft: theme.spacing(2),
  },
  righttMenu: {
    marginRight: theme.spacing(2),
  },
  avatar: {
    cursor: 'pointer',
    width: 32,
    height: 32,
  },
}));

const LeftMenu = [];

const RightMenu = [
  {
    href: '/',
    title: 'My Stories',
    restricted: false,
  },
  {
    href: '/users',
    title: 'Users',
    restricted: ['Admin', 'Instructor'],
  },
];

const TopBar = ({ className, ...rest }) => {
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
        <Toolbar>
          <RouterLink to="/">
            <Logo className={classes.logo} />
          </RouterLink>
          <Box className={classes.leftMenu}>
            {LeftMenu.map((item) => {
              if (
                item.restricted &&
                !item.restricted.includes(state.session.user.roleType)
              )
                return;
              return (
                <Button component={RouterLink} key={item.title} to={item.href}>
                  {item.title}
                </Button>
              );
            })}
          </Box>
          <Box flexGrow={1} />
          <Typography component="h1" variant="h5">
            {state.ui.title}
          </Typography>
          <Box flexGrow={1} />
          <Box className={classes.rightMenu}>
            {RightMenu.map((item) => {
              if (
                item.restricted &&
                !item.restricted.includes(state.session.user.roleType)
              )
                return;
              return (
                <Button component={RouterLink} key={item.title} to={item.href}>
                  {item.title}
                </Button>
              );
            })}
          </Box>
          <Box alignItems="center" display="flex" flexDirection="row" p={2}>
            <Avatar
              className={classes.avatar}
              // component={RouterLink}
              src={`/assets/users/images/${state.session.user.avatarUrl}`}
              // to="/user/account"
              onClick={handleProfileClick}
            />
          </Box>
          <Profile anchor={anchorProfileEl} handleClose={handleProfileClose}/>
        </Toolbar>
      </AppBar>
    </div>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
