import { Box, Button, makeStyles, Toolbar } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FilterGroup from 'src/components/menubar/FilterGroup';
import FilterStatus from 'src/components/menubar/FilterStatus';
import SearchBox from 'src/components/menubar/SearchBox';
import { useApp } from 'src/overmind';
import FilterRole from './FilterRole';

const useStyles = makeStyles(({ spacing }) => ({
  marginRight: { marginRight: spacing(2) },
}));

const filterStatus = true;

const MenuBar = ({
  handleDetailOpen,
  handleFilterByGroup,
  updateFilter,
  handleSearch,
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const { t } = useTranslation(['users']);

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
      {state.session.isAdmin && (
        <FilterStatus handleFilter={updateFilter} value={filterStatus} />
      )}
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
