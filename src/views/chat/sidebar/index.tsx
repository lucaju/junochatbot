import { Drawer, Paper, Stack, TextField, useMediaQuery, useTheme } from '@material-ui/core';
import { useActions } from '@src/overmind';
import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Conversation from './Conversation';

interface SideBarProps {
  width: number;
}

const SideBar: FC<SideBarProps> = ({ width }) => {
  const { t } = useTranslation(['common']);
  const actions = useActions();
  const theme = useTheme();

  const [userInputState, setUserInputState] = useState('');

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleUserInput = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUserInputState(event.target.value);
  };

  const handleUserTriggerInput = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      const userInput = userInputState.trim();
      if (userInput === '') return;
      actions.chat.submitUserInput(userInputState);
      setUserInputState('');
    }
  };

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
          <TextField
            autoComplete="off"
            id="user-input"
            onChange={handleUserInput}
            onKeyPress={handleUserTriggerInput}
            placeholder={t('typeHere')}
            value={userInputState}
            variant="filled"
          />
        </Stack>
      </Paper>
    </Drawer>
  );
};

export default SideBar;
