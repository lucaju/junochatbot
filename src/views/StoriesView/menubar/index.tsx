import { Box, Button, Stack } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FilterGroup from '@src/components/menubar/FilterGroup';
import SearchBox from '@src/components/menubar/SearchBox';
import { useAppState, useActions } from '@src/overmind';
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
  const { t } = useTranslation(['stories']);

  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 3 }}>
      {!story.stories.some((story) => {
        return story.user?.id === session.user?.id;
      }) ? (
        <>
          <Button
            color="primary"
            onClick={() => handleDetailOpen()}
            startIcon={<AddCircleOutlineIcon />}
          >
            {t('createStory')}
          </Button>
        </>
      ) : (
        <>
          <FilterMyStory handleFilter={updateFilter} value={session.user?.id} />
        </>
      )}
      <Box flexGrow={1} />
      <SearchBox handleSearch={handleSearch} />
      {session.isAdmin && <FilterGroup handleFilter={handleFilterByGroup} />}
      <FilterPublished handleFilter={updateFilter} />
    </Stack>
  );
};

export default MenuBar;
