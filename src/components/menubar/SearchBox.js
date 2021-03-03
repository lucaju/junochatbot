import { makeStyles, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles(({ palette }) => ({
  highlight: { color: palette.primary.main },
}));

const SearchBox = ({ className, handleSearch, value }) => {
  const classes = useStyles();
  const [filterValue, setFilterValue] = useState(value);

  const handleChange = (value) => {
    setFilterValue(value);
    handleSearch(value);
  };

  const isOn = () => filterValue !== '';

  return (
    <TextField
      className={className}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon
              className={clsx(isOn() && classes.highlight)}
              fontSize="small"
            />
          </InputAdornment>
        ),
        className: clsx(isOn() && classes.highlight),
      }}
      label="Title"
      name="filterTitle"
      onChange={(e) => handleChange(e.target.value)}
      size="small"
      variant="outlined"
      value={filterValue}
    />
  );
};

SearchBox.defaultProps = {
  value: '',
}

SearchBox.propTypes = {
  className: PropTypes.string,
  handleSearch: PropTypes.func,
  value: PropTypes.any
};

export default SearchBox;
