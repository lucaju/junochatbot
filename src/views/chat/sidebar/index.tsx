import { Drawer, Paper, Stack, useMediaQuery, useTheme } from '@material-ui/core';
import { useActions } from '@src/overmind';
import React, { FC } from 'react';
import Conversation from './Conversation';
import UserInput from './UserInput';

interface SideBarProps {
  width: number;
}

const SideBar: FC<SideBarProps> = ({ width }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { chat } = useActions();

  const handleReset = () => chat.reset();

  return (
    <Drawer
      anchor={isMobile ? 'bottom' : 'right'}
      sx={{
        width: isMobile ? '100%' : width,
        height: isMobile ? '25vh' : 'auto',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isMobile ? '100%' : width,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
    >
      <Paper
        elevation={3}
        square
        sx={{
          width: isMobile ? '100%' : width,
          height: isMobile ? '25vh' : '100vh',
        }}
      >
        <Stack height="100%" justifyContent="space-between">
          <Conversation />
          <UserInput />
        </Stack>
      </Paper>
    </Drawer>
  );
};

export default SideBar;
