import { Box, Button, Stack } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FilterGroup from '@src/components/menubar/FilterGroup';
import SearchBox from '@src/components/menubar/SearchBox';
import { useApp } from '@src/overmind';
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
  const { state } = useApp();
  const { t } = useTranslation(['users']);

  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 3 }}>
      <Button
        color="primary"
        onClick={() => handleDetailOpen()}
        startIcon={<AddCircleOutlineIcon />}
      >
        {t('addUser')}
      </Button>
      <Box flexGrow={1} />
      <SearchBox handleSearch={handleSearch} />
      {state.session.isAdmin && <FilterGroup handleFilter={handleFilterByGroup} />}
      <FilterRole handleFilter={updateFilter} />
    </Stack>
  );
};

export default MenuBar;
