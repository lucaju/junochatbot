import { Box, Button, makeStyles, Toolbar } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FilterStatus from 'src/components/menubar/FilterStatus';
import SearchBox from 'src/components/menubar/SearchBox';
import FilterTag from './FilterTag';

const useStyles = makeStyles(({ spacing }) => ({
  marginRight: { marginRight: spacing(2) },
}));

const filterStatus = true;

const MenuBar = ({
  disabledFilters,
  handleDetailOpen,
  handleFilterByTag,
  handleSearch,
  updateFilter,
}) => {
  const classes = useStyles();

  useEffect(() => {
    updateFilter({ type: 'active', value: filterStatus });
    return () => {};
  }, []);

  return (
    <Toolbar className={classes.root} disableGutters variant="dense">
      <Button
        color="primary"
        onClick={() => handleDetailOpen()}
        startIcon={<AddCircleOutlineIcon />}
      >
        Add Video
      </Button>
      {!disabledFilters && (
        <>
          <Box flexGrow={1} />
          <SearchBox
            className={classes.marginRight}
            handleSearch={handleSearch}
          />
          <FilterTag
            className={classes.marginRight}
            handleFilter={handleFilterByTag}
          />
          <FilterStatus handleFilter={updateFilter} value={filterStatus} />
        </>
      )}
    </Toolbar>
  );
};

MenuBar.DefaultProps = {
  disabledFilters: false,
};

MenuBar.propTypes = {
  disabledFilters: PropTypes.bool,
  handleDetailOpen: PropTypes.func,
  handleFilterByTag: PropTypes.func,
  handleSearch: PropTypes.func,
  updateFilter: PropTypes.func,
};

export default MenuBar;
