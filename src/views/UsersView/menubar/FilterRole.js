import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useApp } from 'src/overmind';

const useStyles = makeStyles(({ palette }) => ({
  box: { width: 125 },
  highlight: { color: palette.primary.main },
}));

const FilterRole = ({ className, handleFilter, value }) => {
  const classes = useStyles();
  const { state } = useApp();
  const [filterValue, setFilterValue] = useState(value);

  const filterRoleOptions = [
    { value: -1, name: 'All' },
    ...state.users.roleTypes,
  ];

  const handleChange = (value) => {
    setFilterValue(value);
    const reset = value === -1 ? true : false;
    handleFilter({ type: 'roleTypeId', value, reset });
  };

  const isOn = () => filterValue !== -1;

  return (
    <TextField
      className={clsx(className, classes.box)}
      InputProps={{ className: clsx(isOn() && classes.highlight) }}
      label="Role"
      name="filterRole"
      onChange={(e) => handleChange(e.target.value)}
      select
      size="small"
      variant="outlined"
      value={filterValue}
    >
      {filterRoleOptions
        .filter((option) => {
          if (state.session.isAdmin) return true;
          if (option.value === -1) return true;
          if (state.session.user.roleTypeId <= option.value) return true;
        })
        .map(({ value, name }) => (
          <MenuItem key={value} value={value}>
            {name}
          </MenuItem>
        ))}
    </TextField>
  );
};

FilterRole.defaultProps = {
  value: -1,
};

FilterRole.propTypes = {
  className: PropTypes.string,
  handleFilter: PropTypes.func,
  value: PropTypes.any,
};

export default FilterRole;
