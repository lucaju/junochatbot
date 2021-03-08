import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from 'src/overmind';

const useStyles = makeStyles(({ palette }) => ({
  capitalize: { textTransform: 'capitalize' },
  highlight: { color: palette.primary.main },
}));

const FilterTag = ({ className, handleFilter, value }) => {
  const classes = useStyles();
  const { state } = useApp();
  const { t } = useTranslation(['common']);
  const [tags, setTags] = useState([{ id: -1, name: 'all', active: true }]);
  const [filterValue, setFilterValue] = useState(value);

  useEffect(() => {
    setTags([
      { id: -1, name: 'all', active: true },
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
        className={clsx(className, classes.capitalize)}
        InputProps={{ className: clsx(isOn() && classes.highlight) }}
        label={t('tag')}
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
