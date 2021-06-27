import { TextField } from '@material-ui/core';
import { useAppState, useActions } from '@src/overmind';
import React, { ChangeEvent, FC, FocusEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface HeadersProps {
  action?: string;
}

const Header: FC<HeadersProps> = ({ action }) => {
  const { intents } = useAppState();
  const actions = useActions();
  const [displayName, setDisplayName] = useState(intents.currentIntent?.displayName);
  const { t } = useTranslation(['intents']);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setDisplayName(value);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    actions.intents.updateCurrentDisplayName(value);
  };

  return (
    <>
      {action === 'create' && t('createIntent')}
      <TextField
        fullWidth
        label={t('name')}
        name="displayName"
        onBlur={handleBlur}
        onChange={handleChange}
        value={displayName}
        variant="standard"
      />
    </>
  );
};

export default Header;
