import { Box, makeStyles, Toolbar } from '@material-ui/core';
import React, { FC } from 'react';
import FilterEntityCategory from './FilterEntityCategory';
import SearchBox from '@src/components/menubar/SearchBox';
import { HandleFilterType } from '@src/types';

interface MenuBarProps {
  handleSearch: (value: string) => void;
  updateFilter: ({ type, value, reset }: HandleFilterType) => void;
  disabledFilters?: boolean;
}

const useStyles = makeStyles(({ spacing }) => ({
  marginRight: { marginRight: spacing(2) },
}));

const MenuBar: FC<MenuBarProps> = ({
  handleSearch,
  updateFilter,
  disabledFilters = false,
}) => {
  const classes = useStyles();

  return (
    <Toolbar disableGutters variant="dense">
      {!disabledFilters && (
        <>
          <Box flexGrow={1} />
          <SearchBox
            className={classes.marginRight}
            handleSearch={handleSearch}
          />
          <FilterEntityCategory
            className={classes.marginRight}
            handleFilter={updateFilter}
          />
        </>
      )}
    </Toolbar>
  );
};

export default MenuBar;
