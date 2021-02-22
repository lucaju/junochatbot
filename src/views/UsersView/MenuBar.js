import { makeStyles, MenuItem, TextField, Toolbar } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useApp } from 'src/overmind';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles(({ spacing }) => ({
  filterActive: { width: 110 },
  filterRole: { width: 110 },
  filterIcon: {
    marginLeft: -spacing(1),
    marginRight: spacing(2.5),
  },
  marginRight: { marginRight: spacing(2) },
}));

const filterActiveOptions = [
  { value: -1, name: 'All' },
  { value: true, name: 'Active' },
  { value: false, name: 'Inactive' },
];

const MenuBar = ({ handleFilterByGroup, updateFilters }) => {
  const classes = useStyles();
  const { state } = useApp();
  const [groups, setGroups] = useState([{ id: -1, name: 'All', active: true }]);
  const [filterGroup, setFilterGroup] = useState(-1);
  const [filterRole, setFilterRole] = useState(-1);
  const [filterActive, setFilterActive] = useState(-1);

  const filterRoleOptions = [
    { value: -1, name: 'All' },
    ...state.users.roleTypes,
  ];

  useEffect(() => {
    setGroups([{ id: -1, name: 'All', active: true }, ...state.users.groups]);
    return () => {};
  }, [state.users.groups]);

  const handleFilterRole = (value) => {
    setFilterRole(value);
    const reset = value === -1 ? true : false;
    updateFilters({ type: 'roleTypeId', value, reset });
  };

  const handleFilterActive = (value) => {
    setFilterActive(value);
    const reset = value === -1 ? true : false;
    updateFilters({ type: 'active', value, reset });
  };

  const handleFilterGroup = (value) => {
    setFilterGroup(value);
    handleFilterByGroup(value);
  };

  return (
    <Toolbar className={classes.root} variant="dense">
      <FilterListIcon className={classes.filterIcon} />
      {state.session.isAdmin && (
        <TextField
          className={clsx(classes.filterRole, classes.marginRight)}
          label="Group"
          name="filterGroup"
          onChange={(e) => handleFilterGroup(e.target.value)}
          select
          size="small"
          variant="outlined"
          value={filterGroup}
        >
          {groups
            .filter(({ active }) => active)
            .map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
        </TextField>
      )}

      <TextField
        className={clsx(classes.filterRole, classes.marginRight)}
        label="Role"
        name="filterRole"
        onChange={(e) => handleFilterRole(e.target.value)}
        select
        value={filterRole}
        variant="outlined"
        size="small"
      >
        {filterRoleOptions
          .filter((option) => {
            if (state.session.isAdmin) return true;
            if (option.value === -1) return true;
            if (state.session.user.roleTypeId <= option.value) return true;
          })
          .map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
      </TextField>

      {state.session.isAdmin && (
        <TextField
          className={classes.filterActive}
          label="Active"
          name="filterActive"
          onChange={(e) => handleFilterActive(e.target.value)}
          select
          size="small"
          variant="outlined"
          value={filterActive}
        >
          {filterActiveOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      )}
    </Toolbar>
  );
};

MenuBar.propTypes = {
  className: PropTypes.string,
  handleFilterByGroup: PropTypes.func,
  updateFilters: PropTypes.func,
};

export default MenuBar;
