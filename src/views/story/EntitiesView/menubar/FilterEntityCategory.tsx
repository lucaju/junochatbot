import { MenuItem, TextField } from '@mui/material';
import { useAppState } from '@src/overmind';
import { HandleFilterType } from '@src/types';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FilterEntityCategoryProps {
  handleFilter: ({ type, value, reset }: HandleFilterType) => void;
  value?: number | string;
}

const FilterEntityCategory: FC<FilterEntityCategoryProps> = ({ handleFilter, value = 'all' }) => {
  const { intents, ui } = useAppState();
  const { t } = useTranslation();
  const [categories, setcategories] = useState([t('common:all')]);
  const [filterValue, setFilterValue] = useState(value);

  useEffect(() => {
    const catSet: Set<string> = new Set();
    intents.entities.forEach(({ category_en_CA, category_fr_CA }) => {
      catSet.add(ui.languageCode === 'en-CA' ? category_en_CA : category_fr_CA);
    });
    setcategories([t('common:all'), ...Array.from(catSet).sort()]);
    return () => {};
  }, [intents.entities]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterValue(value);
    const reset = value === t('common:all') ? true : false;
    handleFilter({ type: 'category', value, reset });
  };

  const isOn = filterValue !== t('common:all');

  return (
    <TextField
      InputProps={{
        sx: {
          color: ({ palette }) => (isOn ? palette.primary.main : undefined),
        },
      }}
      label={t('common:category')}
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
        <MenuItem key={name} sx={{ textTransform: 'capitalize' }} value={name}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FilterEntityCategory;
