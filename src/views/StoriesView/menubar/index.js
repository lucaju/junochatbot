import { Box, Button, makeStyles, Toolbar } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import React from 'react';
import FilterGroup from 'src/components/menubar/FilterGroup';
import SearchBox from 'src/components/menubar/SearchBox';
import { useApp } from 'src/overmind';
import FilterPublished from './FilterPublished';

const useStyles = makeStyles(({ spacing }) => ({
  marginRight: { marginRight: spacing(2) },
}));

const MenuBar = ({
  handleDetailOpen,
  handleFilterByGroup,
  updateFilter,
  handleSearch,
}) => {
  const classes = useStyles();
  const { state } = useApp();

  return (
    <Toolbar className={classes.root} disableGutters variant="dense">
      <Button
        color="primary"
        onClick={() => handleDetailOpen()}
        startIcon={<AddCircleOutlineIcon />}
      >
        Add Story
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
      <FilterPublished handleFilter={updateFilter} />
    </Toolbar>
  );
};

MenuBar.propTypes = {
  handleDetailOpen: PropTypes.func,
  handleFilterByGroup: PropTypes.func,
  updateFilter: PropTypes.func,
  handleSearch: PropTypes.func,
};

export default MenuBar;
