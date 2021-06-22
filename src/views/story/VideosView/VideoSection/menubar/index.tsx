import { Box, Button, Stack } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchBox from '@src/components/menubar/SearchBox';
import { HandleFilterType } from '@src/types';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import FilterTag from './FilterTag';

interface MenuBarProps {
  handleDetailOpen: () => void;
  handleSearch: (value: string) => void;
  handleFilterByTag: (value: number) => void;
  updateFilter: ({ type, value, reset }: HandleFilterType) => void;
  disabledFilters?: boolean;
}

const MenuBar: FC<MenuBarProps> = ({
  disabledFilters = false,
  handleDetailOpen,
  handleFilterByTag,
  handleSearch,
  updateFilter,
}) => {
  const { t } = useTranslation(['videos']);

  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 3 }}>
      <Button
        color="primary"
        onClick={() => handleDetailOpen()}
        startIcon={<AddCircleOutlineIcon />}
      >
        {t('addVideo')}
      </Button>
      {!disabledFilters && (
        <>
          <Box flexGrow={1} />
          <SearchBox handleSearch={handleSearch} />
          <FilterTag handleFilter={handleFilterByTag} />
        </>
      )}
    </Stack>
  );
};

export default MenuBar;
