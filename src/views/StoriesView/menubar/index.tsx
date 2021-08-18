import { Box, Button, Stack, useMediaQuery, useTheme } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FilterGroup from '@src/components/menubar/FilterGroup';
import SearchBox from '@src/components/menubar/SearchBox';
import { useAppState } from '@src/overmind';
import { HandleFilterType } from '@src/types';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import FilterMyStory from './FilterMyStory';
import FilterPublished from './FilterPublished';

interface MenuBarProps {
  handleDetailOpen: () => void;
  updateFilter: ({ type, value, reset }: HandleFilterType) => void;
  handleFilterByGroup: (value: number) => void;
  handleSearch: (value: string) => void;
}

const MenuBar: FC<MenuBarProps> = ({
  handleDetailOpen,
  handleFilterByGroup,
  updateFilter,
  handleSearch,
}) => {
  const { session, story } = useAppState();
  const { t } = useTranslation();

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));
  const isLG = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Stack direction={isSM ? 'column' : 'row'} justifyContent="flex-end" spacing={2} pt={2}>
      {!story.userHasStory ? (
        <Button
          color="primary"
          onClick={() => handleDetailOpen()}
          startIcon={<AddCircleOutlineIcon />}
        >
          {t('stories:createStory')}
        </Button>
      ) : (
        <FilterMyStory handleFilter={updateFilter} value={session.user?.id} />
      )}
      {!isSM && <Box flexGrow={1} />}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <SearchBox handleSearch={handleSearch} />
        {session.isAdmin && !isLG && <FilterGroup handleFilter={handleFilterByGroup} />}
        <FilterPublished handleFilter={updateFilter} />
      </Stack>
    </Stack>
  );
};

export default MenuBar;
