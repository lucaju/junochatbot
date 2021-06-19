import { makeStyles, TextField } from '@material-ui/core';
import { useApp } from '@src/overmind';
import React, { ChangeEvent, FC, FocusEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface HeadersProps {
  action?: string;
}

const useStyles = makeStyles(() => ({
  root: {},
}));

const Header: FC<HeadersProps> = ({ action }) => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const [displayName, setDisplayName] = useState(state.intents.currentIntent?.displayName);
  const { t } = useTranslation(['intents']);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setDisplayName(value);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    console.log('oi')
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
      />
    </>
  );
};

export default Header;
