import {
  Box,
  Divider,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useActions, useAppState } from '@src/overmind';
import { sortBy } from '@src/util/utilities';
import React, { FC, MouseEvent, useEffect } from 'react';
import { Entity } from '@src/types';

interface EntitiesMenuProps {
  addPart: (value: string, paramName?: string) => void;
  anchorEl?: HTMLElement | null;
  anchorPos?: { top: number; left: number };
  anchorReference: 'anchorEl' | 'anchorPosition' | 'none';
  handleClose: () => void;
  open?: boolean;
  removePart: (currentAlias?: string) => void;
  updatePart: (currentAlias: string, entityName?: string, paramName?: string) => void;
  value?: string;
}

const CONTEXTMENU_ITEM_HEIGHT = 48;

const EntitiesMenu: FC<EntitiesMenuProps> = ({
  addPart,
  anchorEl = null,
  anchorPos,
  anchorReference = 'none',
  handleClose,
  open = false,
  removePart,
  updatePart,
  value,
}) => {
  const { intents } = useAppState();
  const actions = useActions();
  const entitiesList: Entity[] = sortBy([...intents.entities], 'name');

  useEffect(() => {
    const fetchEntities = async () => {
      if (intents.entities.length === 0) await actions.intents.getEntities();
    };
    if (open) fetchEntities();
    return () => {};
  }, [open]);

  const handleClick = (entityName?: string, paramName?: string) => {
    if (!entityName) return;
    value ? updatePart(value, entityName, paramName) : addPart(entityName, paramName);
    handleClose();
  };

  const handleRemove = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    removePart(value);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorPosition={anchorPos}
      anchorReference={anchorReference}
      keepMounted
      id="entities-menu"
      PaperProps={{
        sx: {
          maxHeight: CONTEXTMENU_ITEM_HEIGHT * 4.5,
          mt: 1,
        },
      }}
      onClose={handleClose}
      open={open}
    >
      {intents.currentIntent?.parameters && (
        <Box>
          <Box
            mt={-1}
            px={2}
            sx={{ backgroundColor: ({ palette }) => alpha(palette.text.primary, 0.05) }}
          >
            <Typography sx={{ textTransform: 'uppercase' }} variant="caption">
              Current parameters
            </Typography>
          </Box>

          {intents.currentIntent?.parameters?.map(
            ({ name, displayName, entityTypeDisplayName }) => (
              <MenuItem
                key={name}
                dense
                onClick={() => handleClick(entityTypeDisplayName, displayName)}
                selected={value === displayName}
              >
                <ListItemText primary={displayName} />
                {value === displayName && (
                  <ListItemSecondaryAction>
                    <IconButton aria-label="delete" onClick={handleRemove} size="small">
                      <HighlightOffIcon fontSize="inherit" />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </MenuItem>
            )
          )}
          <Divider sx={{ my: 0.5 }} />
        </Box>
      )}
      <Box
        mt={-1}
        px={2}
        sx={{ backgroundColor: ({ palette }) => alpha(palette.text.primary, 0.05) }}
      >
        <Typography sx={{ textTransform: 'uppercase' }} variant="caption">
          Create new parameter
        </Typography>
      </Box>
      {entitiesList
        .filter(({ id, name }) => {
          return !intents.currentIntent?.parameters?.some(
            (param) => param.entityTypeDisplayName === name
          );
        })
        .map(({ id, name }) => (
          <MenuItem key={id} dense onClick={() => handleClick(name)}>
            {name}
          </MenuItem>
        ))}
    </Menu>
  );
};

export default EntitiesMenu;
