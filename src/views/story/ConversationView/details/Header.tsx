import {
  MenuItem,
  Select,
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
  const { t } = useTranslation(['intents']);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setDisplayName(value);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    actions.intents.updateCurrentDisplayName(value);
  };

  const handleToggleChage = (event: MouseEvent<HTMLElement>, value: string | null) => {
    if (!value) return;
    changeTab(value);
  };

  const handleSelect = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: string;
      event: Event | React.SyntheticEvent<Element, Event>;
    }>
  ) => {
    console.log(event.target.value);
    changeTab(event.target.value);
  };

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));
  const isLG = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Stack spacing={1} alignItems="center">
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
      {action !== 'create' && (
        <>
          {isSM ? (
            <Select fullWidth labelId="tab" id="tab" onChange={handleSelect} value={activeTab}>
              <MenuItem value={'context'}>Contexts</MenuItem>
              <MenuItem value={'training'}>Training</MenuItem>
              <MenuItem value={'parameters'}>Parameters</MenuItem>
              <MenuItem value={'responses'}>Responses</MenuItem>
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
              <ToggleButton aria-label="contexts" value="context">
                <CenterFocusWeakIcon sx={{ mr: 1 }} />
                Contexts
              </ToggleButton>
              <ToggleButton aria-label="training" value="training">
                <FitnessCenterIcon sx={{ mr: 1 }} />
                Training
              </ToggleButton>
              <ToggleButton aria-label="parameters" value="parameters">
                <EditAttributesIcon sx={{ mr: 1 }} />
                Parameters
              </ToggleButton>
              <ToggleButton aria-label="responses" value="responses">
                <ChatOutlinedIcon sx={{ mr: 1 }} />
                Responses
              </ToggleButton>
            </StyledToggleButtonGroup>
          )}
        </>
      )}
    </Stack>
  );
};

export default Header;
