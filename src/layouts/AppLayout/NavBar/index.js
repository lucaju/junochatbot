import { Box, Drawer, Hidden, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Logo from 'src/components/Logo';
import Menu from './Menu';
import { storyMenu } from './menus/storyMenu';
import { adminMenu } from './menus/adminMenu';
import { useApp } from 'src/overmind';

const useStyles = makeStyles(({ palette, spacing }) => ({
  desktopDrawer: {
    backgroundColor: palette.background.default,
    borderRight: 0,
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  desktopDrawerCompact: { width: 72 },
  logo: {
    height: 36,
    marginLeft: spacing(1),
  },
  mobileDrawer: { width: 256 },
  topBar: {
    height: 64,
    marginLeft: spacing(2),
  },
}));

const NavBar = ({ compactMode, onMobileClose, openMobile, showStoryMenu }) => {
  const classes = useStyles();
  const location = useLocation();
  const { state } = useApp();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  return (
    <>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          classes={{ paper: clsx(classes.mobileDrawer) }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            className={classes.topBar}
          >
            <IconButton color="inherit" onClick={onMobileClose}>
              <MenuIcon />
            </IconButton>
            <RouterLink to="/">
              <Logo className={classes.logo} type="simplified" />
            </RouterLink>
          </Box>
          {showStoryMenu && (
            <Menu compactMode={compactMode} items={storyMenu} />
          )}
          {state.session.user.roleTypeId <= 2 && (
            <>
              <Box flexGrow={1} />
              <Menu compactMode={compactMode} items={adminMenu} />
            </>
          )}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          anchor="left"
          classes={{
            paper: clsx(
              classes.desktopDrawer,
              compactMode && classes.desktopDrawerCompact
            ),
          }}
          open
          variant="persistent"
        >
          {showStoryMenu && (
            <Menu compactMode={compactMode} items={storyMenu} />
          )}
          {state.session.user.roleTypeId <= 2 && (
            <>
              <Box flexGrow={1} />
              <Menu compactMode={compactMode} items={adminMenu} />
            </>
          )}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  compactMode: PropTypes.bool,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  showStoryMenu: PropTypes.bool,
};

NavBar.defaultProps = {
  compactMode: false,
  onMobileClose: () => {},
  openMobile: false,
  showStoryMenu: false,
};

export default NavBar;