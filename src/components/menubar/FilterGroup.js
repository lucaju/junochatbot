import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useApp } from 'src/overmind';

const useStyles = makeStyles(({ palette }) => ({
  highlight: { color: palette.primary.main },
}));

const FilterGroup = ({ className, handleFilter, value }) => {
  const classes = useStyles();
  const { state } = useApp();
  const [groups, setGroups] = useState([{ id: -1, name: 'All', active: true }]);
  const [filterValue, setFilterValue] = useState(value);

  useEffect(() => {
    setGroups([{ id: -1, name: 'All', active: true }, ...state.users.groups]);
    return () => {};
  }, [state.users.groups]);

  const handleChange = (value) => {
    setFilterValue(value);
    handleFilter(value);
  };

  const isOn = () => filterValue !== -1;

  return (
    <TextField
        className={className}
        InputProps={{ className: clsx(isOn() && classes.highlight) }}
        label="Group"
        name="filterGroup"
        onChange={(e) => handleChange(e.target.value)}
        select
        size="small"
        variant="outlined"
        value={filterValue}
      >
        {groups
          .filter(({ active }) => active)
          .map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
      </TextField>
  );
};

FilterGroup.defaultProps = {
  value: -1,
}

FilterGroup.propTypes = {
  className: PropTypes.string,
  handleFilter: PropTypes.func,
  value: PropTypes.any
};

export default FilterGroup;
