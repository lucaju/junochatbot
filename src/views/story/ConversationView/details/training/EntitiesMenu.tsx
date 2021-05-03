import { makeStyles, Menu, MenuItem } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useApp } from '@src/overmind';

interface EntitiesMenuProps {
  handleProcessSelection: (value: string) => void;
  handleClose: () => void;
  anchorEl?: HTMLElement | null;
  open?: boolean
  value?: string
}

const useStyles = makeStyles(({}) => ({
  root: {},
}));

const CONTEXTMENU_ITEM_HEIGHT = 48;

const EntitiesMenu: FC<EntitiesMenuProps> = ({
  handleProcessSelection,
  handleClose,
  anchorEl = null,
  open = false,
  value,
}) => {
  const classes = useStyles();
  const { state, actions } = useApp();

  useEffect(() => {
    const fetchEntities = async () => {
      if (state.intents.entities.length === 0) await actions.intents.getEntities();
    };
    if (!open) fetchEntities();
    return () => {};
  }, [open]);

  const handleClick = (name: string) => {
    handleProcessSelection(name);
    handleClose();
  }

  return (
    <Menu
      id="entities-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: CONTEXTMENU_ITEM_HEIGHT * 4.5,
          marginTop: 50,
        },
      }}
    >
      {state.intents.entities.map(({ id, name }) => (
        <MenuItem
          key={id}
          dense
          selected={name === value}
          onClick={() => handleClick(name)}
        >
          {name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default EntitiesMenu;
