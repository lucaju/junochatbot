import { MenuItem, TextField } from '@material-ui/core';
import { useAppState, useActions } from '@src/overmind';
import { HandleFilterType, RoleType } from '@src/types';
import React, { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FilterStatusProps {
  handleFilter: ({ type, value, reset }: HandleFilterType) => void;
  value?: number;
}

const FilterRole: FC<FilterStatusProps> = ({ handleFilter, value = 'All' }) => {
  const { session, users } = useAppState();
  const { t } = useTranslation(['users']);
  const [filterValue, setFilterValue] = useState(value);

  const filterRoleOptions = ['All', ...users.roleTypes];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterValue(value);
    const reset = value === 'All' ? true : false;
    handleFilter({ type: 'roleTypeId', value, reset });
  };

  const isOn = filterValue !== 0;

  return (
    <TextField
      InputProps={{
        sx: {
          color: ({ palette }) => (isOn ? palette.primary.main : undefined),
        },
      }}
      label={t('role')}
      name="filterRole"
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
