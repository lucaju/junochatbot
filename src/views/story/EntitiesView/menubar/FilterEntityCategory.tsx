import { MenuItem, TextField } from '@material-ui/core';
import { useAppState } from '@src/overmind';
import { HandleFilterType } from '@src/types';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FilterEntityCategoryProps {
  handleFilter: ({ type, value, reset }: HandleFilterType) => void;
  value?: string;
}

const FilterEntityCategory: FC<FilterEntityCategoryProps> = ({ handleFilter, value = 'All' }) => {
  const { intents } = useAppState();
  const { t } = useTranslation(['common']);
  const [categories, setcategories] = useState(['All']);
  const [filterValue, setFilterValue] = useState(value);

  useEffect(() => {
    const catSet: Set<string> = new Set();
    intents.entities.forEach(({ category }) => catSet.add(category));
    if (intents.customEntities.length > 0) catSet.add('Custom');
    setcategories(['All', ...Array.from(catSet).sort()]);
    return () => {};
  }, [intents.entities]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterValue(value);
    const reset = value === 'All' ? true : false;
    handleFilter({ type: 'category', value, reset });
  };

  const isOn = filterValue !== 'All';

  return (
    <TextField
      InputProps={{
        sx: {
          color: ({ palette }) => (isOn ? palette.primary.main : undefined),
        },
      }}
      label={t('category')}
      name="filterEntityCategory"
      onChange={handleChange}
      select
      size="small"
      sx={{
        minWidth: 100,
        textTransform: 'capitalize',
      }}
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
