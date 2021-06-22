import { Box, TextField } from '@material-ui/core';
import React, { ChangeEvent, FC, FocusEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ParamsExtraProps {
  defaultValue?: string;
  handleUpdateDefault: (value: string) => void;
}

const ParamsExtra: FC<ParamsExtraProps> = ({ defaultValue = '', handleUpdateDefault }) => {
  const { t } = useTranslation(['intents']);
  const [_defaultValue, set_defaultValue] = useState(defaultValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    set_defaultValue(target.value);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (value === defaultValue) return;
    handleUpdateDefault(value);
  };

  return (
    <Box p={2}>
      <TextField
        fullWidth
        label={t('defaultValue')}
        name="defaultValue"
        onBlur={handleBlur}
        onChange={handleChange}
        value={_defaultValue}
      />
    </Box>
  );
};

export default ParamsExtra;
