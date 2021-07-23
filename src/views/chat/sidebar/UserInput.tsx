import { FilledInput, IconButton, InputAdornment } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useActions } from '@src/overmind';
import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

const UserInput: FC = () => {
  const { t } = useTranslation(['common']);
  const actions = useActions();

  const [userInputState, setUserInputState] = useState('');

  const handleUserInput = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    //Dialogflow Limit: https://cloud.google.com/dialogflow/quotas#es-agent_1
    if (userInputState.trim().length > 250 && userInputState < event.target.value) return;

    setUserInputState(event.target.value);
  };

  const handleUserTriggerInput = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let userInput = userInputState.trim();
    if (userInput === '') return;
    if (userInput.length > 250) userInput.substring(0, 250);

    actions.chat.submitUserInput(userInputState);
    setUserInputState('');
  };

  return (
    <FilledInput
      autoComplete="off"
      endAdornment={
        <InputAdornment position="end">
          <IconButton edge="end" onClick={handleSubmit} sx={{ mt: 2, mr: 1 }}>
            <SendIcon fontSize="inherit" />
          </IconButton>
        </InputAdornment>
      }
      id="user-input"
      multiline
      onChange={handleUserInput}
      onKeyPress={handleUserTriggerInput}
      placeholder={t('typeHere')}
      sx={{ pb: 2 }}
      value={userInputState}
    />
  );
};

export default UserInput;
