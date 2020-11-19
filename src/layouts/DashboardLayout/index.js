import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { useApp } from 'src/overmind';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
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
    // [theme.breakpoints.up('lg')]: {
    //   paddingLeft: 256,
    // },
  },
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

const DashboardLayout = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, actions } = useApp();

  const isSignedIn = state.session.isSignedIn;

  useEffect(() => {
    const checkUser = async () => {
      const isSignIn = await actions.session.signedIn();
      if (!isSignIn) navigate('/login', { replace: true });
    };
    checkUser();
    return () => {};
  }, []);

  return (
    <div className={classes.root}>
      {isSignedIn && (
        <>
          <TopBar />
          <NavBar
          // onMobileClose={() => setMobileNavOpen(false)}
          // openMobile={isMobileNavOpen}
          />
          <div className={classes.wrapper}>
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

export default DashboardLayout;
