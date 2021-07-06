import { Box, Stack } from '@material-ui/core';
import SearchBox from '@src/components/menubar/SearchBox';
import { useAppState } from '@src/overmind';
import React, { FC } from 'react';

interface MenuBarProps {
  handleSearch: (value: string) => void;
}

const THRESHOOLD_SHOW_SEARCH = 3; //items

const MenuBar: FC<MenuBarProps> = ({ handleSearch }) => {
  const { intents } = useAppState();
  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 3 }}>
      <Box flexGrow={1} />
      {intents.contexts.length > THRESHOOLD_SHOW_SEARCH && (
        <SearchBox handleSearch={handleSearch} />
      )}
    </Stack>
  );
};

export default MenuBar;
