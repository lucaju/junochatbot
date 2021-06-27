import { MenuItem, TextField } from '@material-ui/core';
import { useAppState } from '@src/overmind';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FilterGroupProps {
  handleFilter: (value: number) => void;
  value?: number;
}

const FilterGroup: FC<FilterGroupProps> = ({ handleFilter, value = -1 }) => {
  const { users } = useAppState();
  const { t } = useTranslation(['common']);
  const [groups, setGroups] = useState([{ id: -1, name: 'all' }]);
  const [filterValue, setFilterValue] = useState(value);

  useEffect(() => {
    setGroups([{ id: -1, name: 'all' }, ...users.groups]);
    return () => {};
  }, [users.groups]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
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
      label={t('group')}
      name="filterGroup"
      onChange={handleChange}
      select
      size="small"
      sx={{ textTransform: 'capitalize' }}
      variant="outlined"
      value={filterValue}
    >
      {groups.map(({ id, name }: { id: number; name: string }) => (
        <MenuItem key={id} value={id}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FilterGroup;
