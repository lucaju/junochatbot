import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(({ palette }) => ({
  box: { width: 105 },
  capitalize: { textTransform: 'capitalize' },
  highlight: { color: palette.primary.main },
}));

const options = [
  { value: -1, name: 'all' },
  { value: true, name: 'published' },
  { value: false, name: 'draft' },
];

const FilterPublished = ({ className, handleFilter, value }) => {
  const classes = useStyles();
  const { t } = useTranslation(['stories']);
  const [filterValue, setFilterValue] = useState(value);

  const handleChange = (value) => {
    setFilterValue(value);
    const reset = value === -1 ? true : false;
    handleFilter({ type: 'published', value, reset });
  };

  const isOn = () => filterValue !== -1;

  return (
    <TextField
      className={clsx(className, classes.box, classes.capitalize)}
      InputProps={{ className: clsx(isOn() && classes.highlight) }}
      label={t('status')}
      name="filterPublished"
      onChange={(e) => handleChange(e.target.value)}
      select
      size="small"
      variant="outlined"
      value={filterValue}
    >
      {options.map(({ name, value }) => (
        <MenuItem className={classes.capitalize} key={value} value={value}>
          {t(name)}
        </MenuItem>
      ))}
    </TextField>
  );
};

FilterPublished.defaultProps = {
  value: -1,
};

FilterPublished.propTypes = {
  className: PropTypes.string,
  handleFilter: PropTypes.func,
  value: PropTypes.any,
};

export default FilterPublished;
