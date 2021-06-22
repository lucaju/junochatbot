import {
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useApp } from '@src/overmind';
import React, { FC, useEffect } from 'react';
import useParameter from '../parameters/hooks';

interface EntitiesMenuProps {
  anchorEl?: HTMLElement | null;
  addPart: (value: string) => void;
  handleClose: () => void;
  open?: boolean;
  removePart: (currentAlias?: string) => void;
  updatePart: (currentAlias: string, entityName?: string) => void;
  value?: string;
}

const CONTEXTMENU_ITEM_HEIGHT = 48;

const EntitiesMenu: FC<EntitiesMenuProps> = ({
  addPart,
  anchorEl = null,
  handleClose,
  open = false,
  removePart,
  updatePart,
  value,
}) => {
  const { state, actions } = useApp();
  const { params } = useParameter();

  useEffect(() => {
    const fetchEntities = async () => {
      if (state.intents.entities.length === 0) await actions.intents.getEntities();
    };
    if (open) fetchEntities();
    return () => {};
  }, [open]);

  const handleClick = (name: string) => {
    value ? updatePart(value, name) : addPart(name);
    handleClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      id="entities-menu"
      PaperProps={{
        sx: {
          maxHeight: CONTEXTMENU_ITEM_HEIGHT * 4.5,
          mt: 6.25,
        },
      }}
      onClose={handleClose}
      open={open}
    >
      {params &&
        params.map(({ name, displayName }) => (
          <ListItem key={name} dense onClick={handleClose} selected={value === displayName}>
            <ListItemText primary={displayName} />
            {value === displayName && (
              <ListItemSecondaryAction>
                <IconButton aria-label="delete" onClick={() => removePart(value)} size="small">
                  <HighlightOffIcon fontSize="inherit" />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      {params && <Divider sx={{ my: 0.5 }} />}
      {state.intents.entities.map(({ id, name }) => (
        <MenuItem key={id} dense onClick={() => handleClick(name)}>
          {name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default EntitiesMenu;
