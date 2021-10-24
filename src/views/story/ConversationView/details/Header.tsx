import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useActions, useAppState } from '@src/overmind';
import React, { ChangeEvent, FC, FocusEvent, KeyboardEvent, MouseEvent, useState } from 'react';
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
  handleSubmit: () => void;
  renamable?: boolean;
}

const Header: FC<HeadersProps> = ({
  action,
  activeTab,
  changeTab,
  handleSubmit,
  renamable = true,
}) => {
  const { intents } = useAppState();
  const actions = useActions();
  const [displayName, setDisplayName] = useState(intents.currentIntent?.displayName);
  const { t } = useTranslation();

  const options = () => {
    const opts = [];
    opts.push({ value: 'training', label: 'training' });
    if (!intents.currentIntent?.isFallback) opts.push({ value: 'parameters', label: 'parameters' });
    opts.push({ value: 'context', label: 'contexts' });
    opts.push({ value: 'responses', label: 'responses' });
    return opts;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim();
    if (value.length > INTENT_NAME_CHAR_LIMIT) return;
    actions.intents.setIntentHaChange(true);
    setDisplayName(value);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim();
    actions.intents.updateCurrentDisplayName(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;

    event.stopPropagation();
    event.preventDefault();

    if (typeof displayName !== 'string' || displayName === '') return;
    actions.intents.updateCurrentDisplayName(displayName);

    if (action === 'create') handleSubmit();
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
      {action === 'create' && t('intents:createIntent')}
      <TextField
        autoComplete="off"
        autoFocus={action === 'create'}
        disabled={!renamable}
        fullWidth
        label={t('common:name')}
        name="displayName"
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        sx={{ textTransform: 'capitalize' }}
        value={displayName}
        variant="standard"
      />
      {action !== 'create' && (
        <>
          {isSM ? (
            <Select fullWidth labelId="tab" id="tab" onChange={handleSelect} value={activeTab}>
              {options().map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {t(`intents${label}`)}
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
              {options().map(({ value, label }) => (
                <ToggleButton key={value} aria-label={value} value={value}>
                  <CenterFocusWeakIcon sx={{ mr: 1 }} />
                  {t(`${label}`)}
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
