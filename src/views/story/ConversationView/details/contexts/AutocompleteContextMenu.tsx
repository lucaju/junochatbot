import { Box, MenuItem, MenuList, useTheme } from '@material-ui/core';
import { useAppState } from '@src/overmind';
import type { ContextRelation } from '@src/types';
import React, { FC, useEffect, useState } from 'react';

interface AutocompleteContextMenuProps {
  anchorEl?: HTMLElement;
  query?: string;
  handleSelect: (value: string) => void;
}

const AutocompleteContextMenu: FC<AutocompleteContextMenuProps> = ({
  anchorEl = null,
  query = '',
  handleSelect,
}) => {
  const { intents } = useAppState();
  const [options, setOptions] = useState<ContextRelation[]>([]);
  const [open, setOpen] = useState(options.length > 0 && !!anchorEl);
  const theme = useTheme();

  useEffect(() => {
    if (query === '') {
      setOptions([]);
      setOpen(false);
      return;
    }

    const matchContexts = intents.contexts.filter((ctx) =>
      ctx.shortname.toLowerCase().match(query.toLowerCase())
    );

    setOptions(matchContexts);
    setOpen(matchContexts.length > 0 && !!anchorEl);

    return () => {};
  }, [query]);

  const handleClose = () => setOpen(false);

  const handleClick = (value: string) => {
    handleSelect(value);
    handleClose();
  };

  return (
    <>
      {open && (
        <Box
          sx={{
            position: 'fixed',
            zIndex: 1,
            mt: 5.5,
            borderRadius: 1,
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.grey[900]
                : theme.palette.background.default,
            boxShadow:
              theme.palette.mode === 'dark'
                ? 0
                : '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
          }}
        >
          <MenuList onClick={handleClose}>
            {options.map(({ shortname }, i) => (
              <MenuItem key={i} onClick={() => handleClick(shortname)} value={shortname}>
                {shortname}
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      )}
    </>
  );
};

export default AutocompleteContextMenu;
