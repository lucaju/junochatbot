import { Box, Stack, useMediaQuery, useTheme } from '@material-ui/core';
import SearchBox from '@src/components/menubar/SearchBox';
import { HandleFilterType } from '@src/types';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import FilterEntityCategory from './FilterEntityCategory';

interface MenuBarProps {
  handleSearch: (value: string) => void;
  updateFilter: ({ type, value, reset }: HandleFilterType) => void;
}

const MenuBar: FC<MenuBarProps> = ({ handleSearch, updateFilter }) => {
  const { t } = useTranslation(['users', 'common']);
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  const initialValueFilterCatagory = t('common:all');

  return (
    <Stack direction={isSM ? 'column' : 'row'} spacing={2} justifyContent="flex-end" sx={{ pt: 3 }}>
      <Box flexGrow={1} />
      <SearchBox handleSearch={handleSearch} />
      <FilterEntityCategory handleFilter={updateFilter} value={initialValueFilterCatagory} />
    </Stack>
  );
};

export default MenuBar;
