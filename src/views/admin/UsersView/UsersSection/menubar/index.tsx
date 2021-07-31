import { Box, Button, Stack, useMediaQuery, useTheme } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FilterGroup from '@src/components/menubar/FilterGroup';
import SearchBox from '@src/components/menubar/SearchBox';
import { useAppState } from '@src/overmind';
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

const THRESHOOLD_SHOW_SEARCH = 3; //items

const MenuBar: FC<MenuBarProps> = ({
  handleDetailOpen,
  handleFilterByGroup,
  handleSearch,
  updateFilter,
}) => {
  const { session, users } = useAppState();
  const { t } = useTranslation();

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));
  const isLG = useMediaQuery(theme.breakpoints.down('lg'));

  const initialValueFilterRole = t('common:all');

  return (
    <Stack
      direction={isSM ? 'column' : 'row'}
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
        {t('users:addUser')}
      </Button>
      <Box flexGrow={1} />
      <Stack direction={isLG ? 'column' : 'row'} spacing={2}>
        {users.list.length > THRESHOOLD_SHOW_SEARCH && <SearchBox handleSearch={handleSearch} />}
        {session.isAdmin && (
          <Stack direction={'row'} spacing={2} justifyContent="flex-end">
            <FilterGroup handleFilter={handleFilterByGroup} />
            <FilterRole handleFilter={updateFilter} value={initialValueFilterRole} />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default MenuBar;
