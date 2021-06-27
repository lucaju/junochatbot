import { MenuItem, TextField } from '@material-ui/core';
import { useAppState } from '@src/overmind';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FilterTagProps {
  handleFilter: (value: number) => void;
  value?: number;
}

const FilterTag: FC<FilterTagProps> = ({ handleFilter, value = -1 }) => {
  const { videos } = useAppState();
  const { t } = useTranslation(['common']);
  const [tags, setTags] = useState([{ id: -1, name: 'all' }]);
  const [filterValue, setFilterValue] = useState(value);

  useEffect(() => {
    setTags([{ id: -1, name: 'all' }, ...videos.tagCollection]);
    return () => {};
  }, [videos.tagCollection]);

  const handleChange = (value: number) => {
    setFilterValue(value);
    handleFilter(value);
  };

  const isOn = filterValue !== -1;

  return (
    <TextField
      InputProps={{
        sx: {
          color: ({ palette }) => (isOn ? palette.primary.main : undefined),
        },
      }}
      label={t('tag')}
      name="filterTag"
      onChange={(e) => handleChange(Number(e.target.value))}
      select
      size="small"
      sx={{ textTransform: 'capitalize' }}
      variant="outlined"
      value={filterValue}
    >
      {tags.map(({ id, name }) => (
        <MenuItem key={id} value={id}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FilterTag;
