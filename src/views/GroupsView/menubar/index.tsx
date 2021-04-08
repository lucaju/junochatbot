import { Box, Button, makeStyles, Toolbar } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FilterStatus from '../../../components/menubar/FilterStatus';
import SearchBox from '../../../components/menubar/SearchBox';
import { HandleFilterType } from '../../../types';

interface MenuBarProps {
  handleDetailOpen: () => void;
  handleSearch: (value: string) => void;
  updateFilter: ({ type, value, reset }: HandleFilterType) => void;
  disabledFilters?: boolean;
}

const useStyles = makeStyles(({ spacing }) => ({
  marginRight: { marginRight: spacing(2) },
}));

const filterStatus = 1;

const MenuBar: FC<MenuBarProps> = ({
  handleDetailOpen,
  handleSearch,
  updateFilter,
  disabledFilters = false,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['groups']);

  useEffect(() => {
    updateFilter({ type: 'active', value: filterStatus });
    return () => {};
  }, []);

  return (
    <Toolbar disableGutters variant="dense">
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
          <SearchBox
            className={classes.marginRight}
            handleSearch={handleSearch}
          />
          <FilterStatus handleFilter={updateFilter} value={filterStatus} />
        </>
      )}
    </Toolbar>
  );
};

export default MenuBar;
