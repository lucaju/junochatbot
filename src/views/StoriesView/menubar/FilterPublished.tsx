import { MenuItem, TextField } from '@material-ui/core';
import React, { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Option = {
  value: number;
  name: string;
};

export type HandleFilterType = {
  type: string;
  value: number;
  reset?: boolean;
};

interface FilterPublishedProps {
  handleFilter: ({ type, value, reset }: HandleFilterType) => void;
  value?: number;
}

const options: Option[] = [
  { value: 0, name: 'all' },
  { value: 1, name: 'published' },
  { value: -1, name: 'draft' },
];

const FilterPublished: FC<FilterPublishedProps> = ({ handleFilter, value = 0 }) => {
  const { t } = useTranslation(['stories']);
  const [filterValue, setFilterValue] = useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setFilterValue(value);
    const reset = value === 0 ? true : false;
    handleFilter({ type: 'published', value, reset });
  };

  const isOn = filterValue !== 0;

  return (
    <TextField
      InputProps={{
        sx: {
          color: ({ palette }) => (isOn ? palette.primary.main : undefined),
        },
      }}
      label={t('status')}
      name="filterPublished"
      onChange={handleChange}
      select
      size="small"
      sx={{
        width: 125,
        textTransform: 'capitalize',
      }}
      variant="outlined"
      value={filterValue}
    >
      {options.map(({ name, value }) => (
        <MenuItem key={value} sx={{ textTransform: 'capitalize' }} value={value}>
          {t(name)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FilterPublished;
