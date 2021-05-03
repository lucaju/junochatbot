import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '@src/overmind';
import { HandleFilterType, RoleType } from '@src/types';

interface FilterStatusProps {
  className: string;
  handleFilter: ({ type, value, reset }: HandleFilterType) => void;
  value?: number;
}

const useStyles = makeStyles(({ palette }) => ({
  box: { width: 125 },
  capitalize: { textTransform: 'capitalize' },
  highlight: { color: palette.primary.main },
}));

const FilterRole: FC<FilterStatusProps> = ({
  className,
  handleFilter,
  value = 'All',
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const { t } = useTranslation(['users']);
  const [filterValue, setFilterValue] = useState(value);

  const filterRoleOptions = ['All', ...state.users.roleTypes];

  const handleChange = (value: number) => {
    setFilterValue(value);
    const reset = value === -1 ? true : false;
    handleFilter({ type: 'roleTypeId', value, reset });
  };

  const isOn = () => filterValue !== 0;

  return (
    <TextField
      className={clsx(className, classes.box, classes.capitalize)}
      InputProps={{ className: clsx(isOn() && classes.highlight) }}
      label={t('role')}
      name="filterRole"
      onChange={(event) => handleChange(Number(event.target.value))}
      select
      size="small"
      variant="outlined"
      value={filterValue}
    >
      {filterRoleOptions
        .filter((option) => {
          if (state.session.isAdmin) return true;
          if (state.session.isInstructor && option === RoleType.ADMIN)
            return false;
        })
        .map((value) => (
          <MenuItem className={classes.capitalize} key={value} value={value}>
            {t(value)}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default FilterRole;
