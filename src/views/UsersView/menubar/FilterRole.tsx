import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../../overmind';
import { RoleType } from '../../../types';

type HandleFilterType = {
  type: string;
  value: number;
  reset?: boolean;
};

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
  value = -1,
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const { t } = useTranslation(['users']);
  const [filterValue, setFilterValue] = useState(value);

  const filterRoleOptions: RoleType[] = [
    { value: -1, name: 'all' },
    ...state.users.roleTypes,
  ];

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
          if (option.value === -1) return true;
          if (
            state.session.user &&
            state.session.user.roleTypeId <= option.value
          )
            return true;
        })
        .map(({ value, name }) => (
          <MenuItem className={classes.capitalize} key={value} value={value}>
            {t(name)}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default FilterRole;
