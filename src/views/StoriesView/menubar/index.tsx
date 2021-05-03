import { Box, Button, makeStyles, Toolbar } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import FilterGroup from '@src/components/menubar/FilterGroup';
import SearchBox from '@src/components/menubar/SearchBox';
import { useApp } from '@src/overmind';
import { HandleFilterType } from '@src/types';
import FilterPublished from './FilterPublished';
import FilterMyStory from './FilterMyStory';

interface MenuBarProps {
  handleDetailOpen: () => void;
  updateFilter: ({ type, value, reset }: HandleFilterType) => void;
  handleFilterByGroup: (value: number) => void;
  handleSearch: (value: string) => void;
}

const useStyles = makeStyles(({ spacing }) => ({
  capitalize: { textTransform: 'capitalize' },
  marginRight: { marginRight: spacing(2) },
}));

const MenuBar: FC<MenuBarProps> = ({
  handleDetailOpen,
  handleFilterByGroup,
  updateFilter,
  handleSearch,
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const { t } = useTranslation(['stories']);

  return (
    <Toolbar disableGutters variant="dense">
      {!state.story.stories.some((story) => {
        return story.user?.id === state.session.user?.id;
      }) ? (
        <>
          <Button
            color="primary"
            onClick={() => handleDetailOpen()}
            startIcon={<AddCircleOutlineIcon />}
          >
            {t('createStory')}
          </Button>
          <Box flexGrow={1} />
        </>
      ) : (
        <>
          <Box flexGrow={1} />
          <FilterMyStory
            className={classes.marginRight}
            handleFilter={updateFilter}
            value={state.session.user?.id}
          />
        </>
      )}
      <SearchBox className={classes.marginRight} handleSearch={handleSearch} />
      {state.session.isAdmin && (
        <FilterGroup
          className={classes.marginRight}
          handleFilter={handleFilterByGroup}
        />
      )}
      <FilterPublished handleFilter={updateFilter} />
    </Toolbar>
  );
};

export default MenuBar;
