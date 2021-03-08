import { makeStyles, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(({ palette }) => ({
  capitalize: { textTransform: 'capitalize' },
  highlight: { color: palette.primary.main },
}));

const SearchBox = ({ className, handleSearch, disabled, value }) => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [filterValue, setFilterValue] = useState(value);

  const handleChange = (value) => {
    setFilterValue(value);
    handleSearch(value);
  };

  const isOn = () => filterValue !== '';

  return (
    <TextField
      className={clsx(classes.capitalize, className)}
      disabled={disabled}
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
      label={t('Search')}
      name="filterSearch"
      onChange={(e) => handleChange(e.target.value)}
      size="small"
      variant="outlined"
      value={filterValue}
    />
  );
};

SearchBox.defaultProps = {
  disabled: false,
  value: '',
}

SearchBox.propTypes = {
  className: PropTypes.string,
  handleSearch: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.any
};

export default SearchBox;
