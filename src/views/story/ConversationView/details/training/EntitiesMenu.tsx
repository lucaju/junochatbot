import {
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useApp } from '@src/overmind';
import React, { FC, useEffect } from 'react';
import useParameter from '../parameters/hooks';

interface EntitiesMenuProps {
  anchorEl?: HTMLElement | null;
  open?: boolean;
  value?: string;
  addPart: (value: string) => void;
  updatePart: (currentAlias: string, entityName?: string) => void;
  removePart: (currentAlias?: string) => void;
  handleClose: () => void;
}

const useStyles = makeStyles(({ spacing }) => ({
  divider: {
    marginTop: spacing(0.5),
    marginBottom: spacing(0.5),
  },
}));

const CONTEXTMENU_ITEM_HEIGHT = 48;

const EntitiesMenu: FC<EntitiesMenuProps> = ({
  addPart,
  updatePart,
  removePart,
  handleClose,
  anchorEl = null,
  open = false,
  value,
}) => {
  const classes = useStyles();
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
      {params &&
        params.map(({ name, displayName }) => (
          <ListItem key={name} dense selected={value === displayName} onClick={() => handleClose()}>
            <ListItemText primary={displayName} />
            {value === displayName && (
              <ListItemSecondaryAction>
                <IconButton aria-label="delete" size="small" onClick={() => removePart(value)}>
                  <HighlightOffIcon fontSize="inherit" />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      {params && <Divider className={classes.divider} />}
      {state.intents.entities.map(({ id, name }) => (
        <MenuItem key={id} dense onClick={() => handleClick(name)}>
          {name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default EntitiesMenu;
