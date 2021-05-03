import { Container, makeStyles } from '@material-ui/core';
import React, { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// import TopBar from '@src/components/TopBar';
import { useApp } from '@src/overmind';

const useStyles = makeStyles(({ palette }) => ({
  root: {
    backgroundColor: palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    maxWidth: 1200,
  },
}));

const MainLayout: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, actions } = useApp();

  const isSignedIn = state.session.isSignedIn;

  useEffect(() => {
    const checkUser = async () => {
      const signIn = await actions.session.signedIn();
      if (!signIn) navigate('/login', { replace: true });
    };
    checkUser();
    return () => {};
  }, []);

  return (
    <div className={classes.root}>
      {isSignedIn && (
        <>
          {/* <TopBar appMode={false} /> */}
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
