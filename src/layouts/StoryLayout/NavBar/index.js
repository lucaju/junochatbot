import {
  Box,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  makeStyles,
} from '@material-ui/core';
import AdbIcon from '@material-ui/icons/Adb';
import LabelIcon from '@material-ui/icons/Label';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import MenuIcon from '@material-ui/icons/Menu';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Logo from 'src/components/Logo';
import NavItem from './NavItem';

const items = [
  {
    title: 'General',
    href: '/story/general',
    icon: AdbIcon,
  },
  {
    title: 'Video Collection',
    href: '/story/video-collection',
    icon: VideoLibraryIcon,
  },
  {
    title: 'Screen Play',
    href: '/story/screenplay',
    icon: QuestionAnswerIcon,
  },
  {
    title: 'Contexts',
    href: '/story/contexts',
    icon: LabelIcon,
  },
  {
    title: 'Tags',
    href: '/story/tags',
    icon: LocalOfferIcon,
  },
];

const useStyles = makeStyles((theme) => ({
  listExanded: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  listCompacted: { padding: theme.spacing(0) },
  mobileDrawer: { width: 256 },
  logo: {
    height: 36,
    marginLeft: theme.spacing(1),
  },
  desktopDrawer: {
    borderRight: 0,
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  desktopDrawerCompact: { width: 72 },
  topBar: {
    height: 64,
    marginLeft: theme.spacing(2),
  },
}));

const NavBar = ({ onMobileClose, openMobile, compactMode }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box
        className={compactMode ? classes.listCompacted : classes.listExanded}
      >
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              isCompact={compactMode}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

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
              <Logo className={classes.logo} />
            </RouterLink>
          </Box>
          <Divider />
          {content}
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
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  compactMode: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
  compactMode: false,
};

export default NavBar;
