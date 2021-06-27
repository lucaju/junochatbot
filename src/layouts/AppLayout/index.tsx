import { Box, Paper, useMediaQuery, useTheme } from '@material-ui/core';
import TopBar from '@src/components/TopBar';
import { useAppState, useActions } from '@src/overmind';
import React, { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

interface AppLayoutProps {
  showStoryMenu?: boolean;
}

const AppLayout: FC<AppLayoutProps> = ({ showStoryMenu = false }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { session } = useAppState();
  const actions = useActions();

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isCompactNav, setIsCompactNav] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const isSignedIn = session.isSignedIn;

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
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
        width: '100%',
      }}
    >
      {isSignedIn && (
        <>
          <TopBar appMode={true} handleMenuClick={handleMenuClick} />
          <NavBar
            compactMode={isCompactNav}
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
            showStoryMenu={showStoryMenu}
          />
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              overflow: 'hidden',
              pt: '64px',
              pl: isMobile ? 0 : isCompactNav ? '72px' : '256px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flex: '1 1 auto',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  flex: '1 1 auto',
                  overflow: 'auto',
                  // height: '100%',
                  height: 'calc(100vh - 64px)',
                }}
              >
                <Outlet />
              </Box>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default AppLayout;
