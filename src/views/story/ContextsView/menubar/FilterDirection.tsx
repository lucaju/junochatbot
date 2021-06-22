import { MenuItem, TextField } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HandleFilterType } from '@src/types';

interface FilterDirectionProps {
  handleFilter: ({ type, value, reset }: HandleFilterType) => void;
  value?: string;
}

const options = ['All', 'In', 'Out'];

const FilterDirection: FC<FilterDirectionProps> = ({ handleFilter, value = 'All' }) => {
  const { t } = useTranslation(['common']);
  const [filterValue, setFilterValue] = useState(value);

  const handleChange = (value: string) => {
    setFilterValue(value);
    const reset = value === 'All' ? true : false;
    handleFilter({ type: 'direction', value, reset });
  };

  const isOn = filterValue !== 'All';

  return (
    <TextField
      InputProps={{
        sx: {
          color: ({ palette }) => (isOn ? palette.primary.main : undefined),
        },
      }}
      label={t('direction')}
      name="filterEntityCategory"
      onChange={(e) => handleChange(e.target.value)}
      select
      size="small"
      sx={{ minWidth: 90, textTransform: 'capitalize' }}
      variant="outlined"
      value={filterValue}
    >
      {options.map((name) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FilterDirection;
