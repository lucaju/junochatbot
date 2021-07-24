import { Box, Button, Menu, MenuItem } from '@material-ui/core';
import { useActions } from '@src/overmind';
import type { Intent } from '@src/types';
import React, { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ContextCardProps {
  intent: Intent;
}

const options = ['fallback', 'no', 'yes'];

const AddFollowUp: FC<ContextCardProps> = ({ intent }) => {
  const { t } = useTranslation(['common', 'intents']);
  const actions = useActions();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleChoiceClick = async (event: MouseEvent<HTMLLIElement>, option: string) => {
    event.stopPropagation();
    await actions.intents.createFollowUpIntent({ originIntent: intent, followUpType: option });
    handleClose();
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
            {t(option)}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AddFollowUp;
