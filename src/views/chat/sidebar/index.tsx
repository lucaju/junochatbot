import { Drawer, Paper, Stack, useMediaQuery, useTheme } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Conversation from './Conversation';
import UserInput from './UserInput';
interface SideBarProps {
  width: number;
}

const SideBar: FC<SideBarProps> = ({ width }) => {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
