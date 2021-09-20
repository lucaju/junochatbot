import { Box, Button, Menu, MenuItem } from '@mui/material';
import { useActions } from '@src/overmind';
import type { Intent } from '@src/types';
import { isError } from '@src/util/utilities';
import React, { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ContextCardProps {
  intent: Intent;
  handleEdit: (value?: string) => void;
}

const options = ['fallback', 'no', 'yes'];

const AddFollowUp: FC<ContextCardProps> = ({ intent, handleEdit }) => {
  const { t } = useTranslation();
  const actions = useActions();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleChoiceClick = async (event: MouseEvent<HTMLLIElement>, option: string) => {
    event.stopPropagation();
    const intentName = await actions.intents.createFollowUpIntent({
      originIntent: intent,
      followUpType: option,
    });
    if (isError(intentName)) return handleClose();
    
    handleClose();
    handleEdit(intentName);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <Box minWidth={170}>
      <Button
        aria-controls="add-follow-up-intent"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        id="add-follow-up-intent"
        onClick={handleClick}
        size="small"
      >
        {t('intents:addFollowUpIntent')}
      </Button>
      <Menu
        id="add-follow-up-intent-menu"
        anchorEl={anchorEl}
        MenuListProps={{ 'aria-labelledby': 'add-follow-up-intent' }}
        onClose={handleClose}
        open={open}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={(event) => handleChoiceClick(event, option)}
            sx={{ textTransform: 'capitalize' }}
          >
            {t(`common:${option}`)}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AddFollowUp;
