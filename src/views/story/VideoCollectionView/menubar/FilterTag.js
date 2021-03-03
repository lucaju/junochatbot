import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useApp } from 'src/overmind';

const useStyles = makeStyles(({ palette }) => ({
  highlight: { color: palette.primary.main },
}));

const FilterTag = ({ className, handleFilter, value }) => {
  const classes = useStyles();
  const { state } = useApp();
  const [tags, setTags] = useState([{ id: -1, name: 'All', active: true }]);
  const [filterValue, setFilterValue] = useState(value);

  useEffect(() => {
    setTags([
      { id: -1, name: 'All', active: true },
      ...state.videos.tagCollection,
    ]);
    return () => {};
  }, [state.videos.tagCollection]);

  const handleChange = (value) => {
    setFilterValue(value);
    handleFilter(value);
  };

  const isOn = () => filterValue !== -1;

  return (
    <TextField
        className={className}
        InputProps={{ className: clsx(isOn() && classes.highlight) }}
        label="Tag"
        name="filterTag"
        onChange={(e) => handleChange(e.target.value)}
        select
        size="small"
        variant="outlined"
        value={filterValue}
      >
        {tags
          .filter(({ active }) => active)
          .map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
      </TextField>
  );
};

FilterTag.defaultProps = {
  value: -1,
}

FilterTag.propTypes = {
  className: PropTypes.string,
  handleFilter: PropTypes.func,
  value: PropTypes.any
};

export default FilterTag;
