import { MenuItem, TextField } from '@mui/material';
import { useAppState } from '@src/overmind';
import { HandleFilterType, RoleType } from '@src/types';
import React, { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FilterStatusProps {
  handleFilter: ({ type, value, reset }: HandleFilterType) => void;
  value?: number | string;
}

const FilterRole: FC<FilterStatusProps> = ({ handleFilter, value = 'all' }) => {
  const { session, users } = useAppState();
  const { t } = useTranslation();
  const [filterValue, setFilterValue] = useState(value);

  const filterRoleOptions = [t('common:all'), ...users.roleTypes];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterValue(value);
    const reset = value === t('common:all') ? true : false;
    handleFilter({ type: 'roleTypeId', value, reset });
  };

  const isOn = filterValue !== 0;

  return (
    <TextField
      InputProps={{ sx: { color: ({ palette }) => (isOn ? palette.primary.main : undefined) } }}
      label={t('users:role')}
      name="filterRole"
      onChange={handleChange}
      select
      size="small"
      sx={{ width: 125, textTransform: 'capitalize' }}
      variant="outlined"
      value={filterValue}
    >
      {filterRoleOptions
        .filter((option) => {
          if (session.isAdmin) return true;
          if (session.isInstructor && option === RoleType.ADMIN) return false;
        })
        .map((value) => (
          <MenuItem key={value} sx={{ textTransform: 'capitalize' }} value={value}>
            {t(value)}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default FilterRole;
