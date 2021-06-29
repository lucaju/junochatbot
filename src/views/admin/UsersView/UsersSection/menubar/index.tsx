import { Box, Button, Stack, useMediaQuery, useTheme } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FilterGroup from '@src/components/menubar/FilterGroup';
import SearchBox from '@src/components/menubar/SearchBox';
import { useAppState, useActions } from '@src/overmind';
import { HandleFilterType } from '@src/types';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import FilterRole from './FilterRole';

interface MenuBarProps {
  handleDetailOpen: () => void;
  handleFilterByGroup: (value: number) => void;
  handleSearch: (value: string) => void;
  updateFilter: ({ type, value, reset }: HandleFilterType) => void;
}

const MenuBar: FC<MenuBarProps> = ({
  handleDetailOpen,
  handleFilterByGroup,
  handleSearch,
  updateFilter,
}) => {
  const { session } = useAppState();
  const { t } = useTranslation(['users']);

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));
  const isLG = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Stack
      direction={isSM? 'column' : 'row'}
      spacing={2}
      justifyContent="flex-end"
      alignItems={isSM ? 'stretch' : 'flex-start'}
      sx={{ pt: isSM ? 0 : 3 }}
    >
      <Button
        color="primary"
        onClick={() => handleDetailOpen()}
        startIcon={<AddCircleOutlineIcon />}
      >
        {t('addUser')}
      </Button>
      <Box flexGrow={1} />
      <Stack direction={isLG ? 'column' : 'row'} spacing={2}>
        <SearchBox handleSearch={handleSearch} />

        <Stack direction={'row'} spacing={2} justifyContent="flex-end">
          {session.isAdmin && <FilterGroup handleFilter={handleFilterByGroup} />}
          <FilterRole handleFilter={updateFilter} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MenuBar;
