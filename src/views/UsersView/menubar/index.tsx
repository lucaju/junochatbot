import { Box, Button, makeStyles, Toolbar } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import FilterGroup from '../../../components/menubar/FilterGroup';
import SearchBox from '../../../components/menubar/SearchBox';
import { useApp } from '../../../overmind';
import FilterRole from './FilterRole';
import { HandleFilterType } from '../../../types';

interface MenuBarProps {
  handleDetailOpen: () => void;
  updateFilter: ({ type, value, reset }: HandleFilterType) => void;
  handleFilterByGroup: (value: number) => void;
  handleSearch: (value: string) => void;
}

const useStyles = makeStyles(({ spacing }) => ({
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
  const { t } = useTranslation(['users']);

  return (
    <Toolbar disableGutters variant="dense">
      <Button
        color="primary"
        onClick={() => handleDetailOpen()}
        startIcon={<AddCircleOutlineIcon />}
      >
       {t('addUser')}
      </Button>
      <Box flexGrow={1} />
      <SearchBox
        className={classes.marginRight}
        handleSearch={handleSearch}
      />
      {state.session.isAdmin && (
        <FilterGroup
          className={classes.marginRight}
          handleFilter={handleFilterByGroup}
        />
      )}
      <FilterRole className={classes.marginRight} handleFilter={updateFilter} />
    </Toolbar>
  );
};

export default MenuBar;
