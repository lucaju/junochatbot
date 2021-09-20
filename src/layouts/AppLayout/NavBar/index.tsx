import { Box, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '@src/components/Logo';
import { useAppState } from '@src/overmind';
import { RoleType } from '@src/types';
import React, { FC, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Menu from './Menu';
import { adminMenu } from './menus/adminMenu';
import { storyMenu } from './menus/storyMenu';

interface NavBarProps {
  compactMode?: boolean;
  onMobileClose?: () => void;
  openMobile?: boolean;
  showStoryMenu?: boolean;
}

const NavBar: FC<NavBarProps> = ({
  compactMode = false,
  onMobileClose = undefined,
  openMobile = false,
  showStoryMenu = false,
}) => {
  const location = useLocation();
  const { session } = useAppState();
  const theme = useTheme();
  const breakpointsUpMd = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const userTypeAllowed = [RoleType.ADMIN, RoleType.INSTRUCTOR];

  return (
    <Drawer
      anchor="left"
      PaperProps={{
        sx: {
          top: breakpointsUpMd || compactMode ? 64 : 0,
          height: breakpointsUpMd || compactMode ? 'calc(100% - 64px)' : '100%',
          width: () => {
            if (breakpointsUpMd && compactMode) return 72;
            if (!breakpointsUpMd && openMobile) return 256;
            if (!breakpointsUpMd) return 0;
            return 256;
          },
          borderRight: 0,
          // backgroundColor: theme.palette.success.light,
        },
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
          sx={{
            height: 64,
            ml: 2,
          }}
        >
          <IconButton color="inherit" onClick={onMobileClose}>
            <MenuIcon />
          </IconButton>
          <RouterLink to="/">
            <Logo height={36} sx={{ ml: 1 }} type="simplified" />
          </RouterLink>
        </Box>
      )}
      {showStoryMenu && <Menu compactMode={compactMode} items={storyMenu} />}
      {session.user && userTypeAllowed.includes(session.user.roleTypeId) && (
        <>
          <Box flexGrow={1} />
          <Menu compactMode={compactMode} items={adminMenu} />
        </>
      )}
    </Drawer>
  );
};

export default NavBar;
