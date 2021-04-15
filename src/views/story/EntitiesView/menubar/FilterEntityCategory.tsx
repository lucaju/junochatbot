import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../../../overmind';
import { HandleFilterType } from '../../../../types';

interface FilterEntityCategoryProps {
  className: string;
  handleFilter: ({ type, value, reset }: HandleFilterType) => void;
  value?: string;
}

const useStyles = makeStyles(({ palette }) => ({
  capitalize: { textTransform: 'capitalize' },
  highlight: { color: palette.primary.main },
}));

const FilterEntityCategory: FC<FilterEntityCategoryProps> = ({
  className,
  handleFilter,
  value = 'All',
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const { t } = useTranslation(['common']);
  const [categories, setcategories] = useState(['All']);
  const [filterValue, setFilterValue] = useState(value);

  useEffect(() => {
    const catSet: Set<string> = new Set();
    state.intents.entities.forEach(({ category }) => catSet.add(category));
    setcategories(['All', ...Array.from(catSet)]);
    return () => {};
  }, [state.intents.entities]);

  const handleChange = (value: string) => {
    setFilterValue(value);
    const reset = value === 'All' ? true : false;
    handleFilter({ type: 'category', value, reset });
  };

  const isOn = filterValue !== 'All';

  return (
    <TextField
      className={clsx(className, classes.capitalize)}
      InputProps={{ className: clsx(isOn && classes.highlight) }}
      label={t('category')}
      name="filterEntityCategory"
      onChange={(e) => handleChange(e.target.value)}
      select
      size="small"
      variant="outlined"
      value={filterValue}
    >
      {categories.map((name) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FilterEntityCategory;
