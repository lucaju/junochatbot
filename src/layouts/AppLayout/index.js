import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import TopBar from 'src/components/TopBar';
import { useApp } from 'src/overmind';
import NavBar from './NavBar';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
  },
  wrapperMobile: { paddingLeft: 0 },
  wrapperCompact: { paddingLeft: 72 },
  wrapperExpaned: { paddingLeft: 256 },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}));

const AppLayout = ({ showStoryMenu }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const { state, actions } = useApp();

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isCompactNav, setIsCompactNav] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isSignedIn = state.session.isSignedIn;

  useEffect(() => {
    const checkUser = async () => {
      const isSignIn = await actions.session.signedIn();
      if (!isSignIn) navigate('/login', { replace: true });
    };
    checkUser();
    return () => {};
  }, []);

  const handleMenuClick = () => {
    if (!isMobile) setIsCompactNav(!isCompactNav);
    if (isMobile) {
      setMobileNavOpen(!isMobileNavOpen);
      setIsCompactNav(false);
    }
  };

  return (
    <div className={classes.root}>
      {isSignedIn && (
        <>
          <TopBar appMode={true} handleMenuClick={handleMenuClick} />
          <NavBar
            compactMode={isCompactNav}
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
            showStoryMenu={showStoryMenu}
          />
          <div
            className={clsx(
              classes.wrapper,
              isMobile && classes.wrapperMobile,
              isCompactNav && classes.wrapperCompact,
              !isCompactNav && !isMobile && classes.wrapperExpaned
            )}
          >
            <div className={classes.contentContainer}>
              <div className={classes.content}>
                <Outlet />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

AppLayout.defaultProps = {
  showStoryMenu: false,
};

AppLayout.propTypes = {
  showStoryMenu: PropTypes.bool,
};

export default AppLayout;
