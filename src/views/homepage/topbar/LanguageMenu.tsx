import LanguageIcon from '@mui/icons-material/Language';
import { Button, Menu, MenuItem } from '@mui/material';
import { useActions, useAppState } from '@src/overmind';
import React, { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageMenu: FC = () => {
  const { t, i18n } = useTranslation();
  const { ui } = useAppState();
  const actions = useActions();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (value: string) => {
    i18n.changeLanguage(value);
    actions.ui.switchLanguage(value);
    handleClose();
  };

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleOpenMenu}
        size="small"
        startIcon={<LanguageIcon fontSize="inherit" />}
      >
        {ui.languageCode}
      </Button>
      <Menu anchorEl={anchorEl} id="language-menu" onClose={handleClose} open={open}>
        {ui.languages.map(({ value, name }) => (
          <MenuItem
            key={value}
            onClick={() => handleClick(value)}
            sx={{ textTransform: 'uppercase' }}
            value={value}
          >
            {t(`home:${name}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageMenu;
