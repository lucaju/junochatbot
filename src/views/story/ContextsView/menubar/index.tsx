import { Box, Stack } from '@material-ui/core';
import SearchBox from '@src/components/menubar/SearchBox';
import { HandleFilterType } from '@src/types';
import React, { FC } from 'react';
import FilterDirection from './FilterDirection';

interface MenuBarProps {
  disabledFilters?: boolean;
  handleSearch: (value: string) => void;
  updateFilter: ({ type, value, reset }: HandleFilterType) => void;
}

const MenuBar: FC<MenuBarProps> = ({ disabledFilters = false, handleSearch, updateFilter }) => (
  <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 3 }}>
    {!disabledFilters && (
      <>
        <Box flexGrow={1} />
        <SearchBox handleSearch={handleSearch} />
        <FilterDirection handleFilter={updateFilter} />
      </>
    )}
  </Stack>
);

export default MenuBar;
