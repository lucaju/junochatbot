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

const FilterPublished: FC<FilterPublishedProps> = ({ handleFilter, value = -1 }) => {
  const { t } = useTranslation();
  const [filterValue, setFilterValue] = useState(value);

  const options: Option[] = [
    { value: -1, name: t('common:all') },
    { value: 1, name: t('common:published') },
    { value: 0, name: t('common:draft') },
  ];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setFilterValue(value);
    const reset = value === -1 ? true : false;
    handleFilter({ type: 'published', value, reset });
  };

  const isOn = filterValue !== -1;

  return (
    <TextField
      InputProps={{
        sx: {
          color: ({ palette }) => (isOn ? palette.primary.main : undefined),
        },
      }}
      label={t('common:status')}
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
          {t(`common:${name}`)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FilterPublished;
