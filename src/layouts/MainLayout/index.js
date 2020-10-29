import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
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
    maxWidth: 1200,
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

const MainLayout = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useApp();

  const isSignedIn = state.session.isSignedIn;

  useEffect(() => {
    if (!isSignedIn) navigate('/login', { replace: true });
    return () => {};
  }, []);

  return (
    <div className={classes.root}>
      {isSignedIn && (
        <>
          <TopBar />
          <Container className={classes.wrapper}>
            <div className={classes.contentContainer}>
              <div className={classes.content}>
                <Outlet />
              </div>
            </div>
          </Container>
        </>
      )}
    </div>
  );
};

export default MainLayout;
