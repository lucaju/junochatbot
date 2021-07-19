import { Drawer, Paper, Stack, TextField, useTheme } from '@material-ui/core';
import React, { FC, ChangeEvent, KeyboardEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppState, useActions } from '@src/overmind';
import Conversation from './Conversation';

interface SideBarProps {
  width: number;
}

const SideBar: FC<SideBarProps> = ({ width }) => {
  const { t } = useTranslation(['common']);
  const { chat } = useAppState();
  const actions = useActions();
  const theme = useTheme();

  const [userInputState, setUserInputState] = useState('');

  const handleUserInput = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUserInputState(event.target.value);
  };

  const handleUserTriggerInput = (event: KeyboardEvent<HTMLDivElement>) => {
    // event.preventDefault();
    if (event.key === 'Enter') {
      actions.chat.submitUserInput(userInputState);
      // actions.conversation.addBotInput(userInputState);
      setUserInputState('');
    }
  };

  return (
    <Drawer
      anchor="right"
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
    >
      <Paper elevation={3} square sx={{ height: '100vh' }}>
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
