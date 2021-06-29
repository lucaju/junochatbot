import { Box, Stack, useMediaQuery, useTheme } from '@material-ui/core';
import SearchBox from '@src/components/menubar/SearchBox';
import { HandleFilterType } from '@src/types';
import React, { FC } from 'react';
import FilterEntityCategory from './FilterEntityCategory';

interface MenuBarProps {
  disabledFilters?: boolean;
  handleSearch: (value: string) => void;
  updateFilter: ({ type, value, reset }: HandleFilterType) => void;
}

const MenuBar: FC<MenuBarProps> = ({ disabledFilters = false, handleSearch, updateFilter }) => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack direction={isSM ? 'column' : 'row'} spacing={2} justifyContent="flex-end" sx={{ pt: 3 }}>
      {!disabledFilters && (
        <>
          <Box flexGrow={1} />
          <SearchBox handleSearch={handleSearch} />
          <FilterEntityCategory handleFilter={updateFilter} />
        </>
      )}
    </Stack>
  );
};

export default MenuBar;
