import {
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { useAppState, useActions } from '@src/overmind';
import React, { ChangeEvent, FC, FocusEvent, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

//LIMITS
//Dialogflow Limit: https://cloud.google.com/dialogflow/quotas#es-agent_1
const INTENT_NAME_CHAR_LIMIT = 480;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': { border: 0 },
    '&:not(:first-of-type)': { borderRadius: theme.shape.borderRadius },
    '&:first-of-type': { borderRadius: theme.shape.borderRadius },
  },
}));

interface HeadersProps {
  action?: string;
  activeTab: string;
  changeTab: (value: string) => void;
}

const Header: FC<HeadersProps> = ({ action, activeTab, changeTab }) => {
  const { intents } = useAppState();
  const actions = useActions();
  const [displayName, setDisplayName] = useState(intents.currentIntent?.displayName);
  const { t } = useTranslation(['intents', 'common']);

  const options = [
    { value: 'context', label: 'contexts' },
    { value: 'training', label: 'training' },
    { value: 'parameters', label: 'parameters' },
    { value: 'responses', label: 'responses' },
  ];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim();
    if (value.length > INTENT_NAME_CHAR_LIMIT) return;
    setDisplayName(value);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim();
    actions.intents.updateCurrentDisplayName(value);
  };

  const handleToggleChage = (event: MouseEvent<HTMLElement>, value: string | null) => {
    if (!value) return;
    changeTab(value);
  };

  const handleSelect = (event: SelectChangeEvent<string>) => changeTab(event.target.value);

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack spacing={1} alignItems="center">
      {action === 'create' && t('createIntent')}
      <TextField
        fullWidth
        label={t('common:name')}
        name="displayName"
        onBlur={handleBlur}
        onChange={handleChange}
        sx={{ textTransform: 'capitalize' }}
        value={displayName}
        variant="standard"
      />
      {action !== 'create' && (
        <>
          {isSM ? (
            <Select fullWidth labelId="tab" id="tab" onChange={handleSelect} value={activeTab}>
              {options.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {t(label)}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <StyledToggleButtonGroup
              aria-label="tab"
              color="primary"
              exclusive
              fullWidth
              orientation={isSM ? 'vertical' : 'horizontal'}
              onChange={handleToggleChage}
              value={activeTab}
            >
              {options.map(({ value, label }) => (
                <ToggleButton key={value} aria-label={value} value={value}>
                  <CenterFocusWeakIcon sx={{ mr: 1 }} />
                  {t(label)}
                </ToggleButton>
              ))}
            </StyledToggleButtonGroup>
          )}
        </>
      )}
    </Stack>
  );
};

export default Header;
