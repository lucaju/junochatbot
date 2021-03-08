import { Box, Button, makeStyles, Toolbar } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FilterStatus from 'src/components/menubar/FilterStatus';
import SearchBox from 'src/components/menubar/SearchBox';

const useStyles = makeStyles(({ spacing }) => ({
  marginRight: { marginRight: spacing(2) },
}));

const filterStatus = true;

const MenuBar = ({
  disabledFilters,
  handleDetailOpen,
  handleSearch,
  updateFilter,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['groups']);

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
        {t('createGroup')}
      </Button>
      {!disabledFilters && (
        <>
      <Box flexGrow={1} />
      <SearchBox className={classes.marginRight} handleSearch={handleSearch} />
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
  handleSearch: PropTypes.func,
  updateFilter: PropTypes.func,
};

export default MenuBar;
