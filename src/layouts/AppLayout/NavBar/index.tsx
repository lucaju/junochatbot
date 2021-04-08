import {
  Box,
  Divider,
  Drawer,
  IconButton,
  makeStyles,
  useMediaQuery,
  useTheme,
  SvgIconTypeMap,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { FC, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Logo from '../../../components/Logo';
import { useApp } from '../../../overmind';
import Menu from './Menu';
import { adminMenu } from './menus/adminMenu';
import { storyMenu } from './menus/storyMenu';

interface NavBarProps {
  compactMode?: boolean;
  onMobileClose?: () => void;
  openMobile?: boolean;
  showStoryMenu?: boolean;
}

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

const NavBar: FC<NavBarProps> = ({
  compactMode = false,
  onMobileClose = undefined,
  openMobile = false,
  showStoryMenu = false,
}) => {
  const classes = useStyles();
  const location = useLocation();
  const { state } = useApp();
  const theme = useTheme();
  const breakpointsUpMd = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  return (
    <Drawer
      anchor="left"
      classes={{
        paper: clsx(
          breakpointsUpMd && classes.desktopDrawer,
          compactMode && classes.desktopDrawerCompact,
          !breakpointsUpMd && classes.mobileDrawer
        ),
      }}
      onClose={breakpointsUpMd ? undefined : onMobileClose}
      open={breakpointsUpMd ? true : openMobile}
      variant={breakpointsUpMd ? 'persistent' : 'temporary'}
    >
      {!breakpointsUpMd && (
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
      )}
      {showStoryMenu && <Menu compactMode={compactMode} items={storyMenu} />}
      {state.session.user && state.session.user.roleTypeId <= 2 && (
        <>
          <Box flexGrow={1} />
          <Divider />
          <Menu compactMode={compactMode} items={adminMenu} />
        </>
      )}
    </Drawer>
  );
};

export default NavBar;
