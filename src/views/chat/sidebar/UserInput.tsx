import { FilledInput, IconButton, InputAdornment } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useActions } from '@src/overmind';
import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

//LIMITS
//Dialogflow Limit: https://cloud.google.com/dialogflow/quotas#es-agent_1
const DETECT_INTENT_CHAR_LIMIT = 250;

const UserInput: FC = () => {
  const { t } = useTranslation();
  const actions = useActions();

  const [userInputState, setUserInputState] = useState('');

  const handleUserInput = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value.trim();
    if (value.length > DETECT_INTENT_CHAR_LIMIT && userInputState < value) return;
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
    if (userInput.length > DETECT_INTENT_CHAR_LIMIT) {
      userInput.substring(0, DETECT_INTENT_CHAR_LIMIT);
    }
    actions.chat.submitUserInput(userInputState);
    setUserInputState('');
  };

  return (
    <FilledInput
      autoComplete="off"
      endAdornment={
        <InputAdornment position="end">
          <IconButton edge="end" onClick={handleSubmit} sx={{ mr: 1 }}>
            <SendIcon fontSize="inherit" />
          </IconButton>
        </InputAdornment>
      }
      id="user-input"
      multiline
      onChange={handleUserInput}
      onKeyPress={handleUserTriggerInput}
      placeholder={t('common:typeHere')}
      sx={{ pb: 2 }}
      value={userInputState}
    />
  );
};

export default UserInput;
