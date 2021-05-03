import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '@src/overmind';

interface FilterGroupProps {
  className: string;
  handleFilter: (value: number) => void;
  value?: number;
}

const useStyles = makeStyles(({ palette }) => ({
  capitalize: { textTransform: 'capitalize' },
  highlight: { color: palette.primary.main },
}));

const FilterGroup: FC<FilterGroupProps> = ({
  className,
  handleFilter,
  value = -1,
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const { t } = useTranslation(['common']);
  const [groups, setGroups] = useState([{ id: -1, name: 'all' }]);
  const [filterValue, setFilterValue] = useState(value);

  useEffect(() => {
    setGroups([{ id: -1, name: 'all' }, ...state.users.groups]);
    return () => {};
  }, [state.users.groups]);

  const handleChange = (value: number) => {
    setFilterValue(value);
    handleFilter(value);
  };

  const isOn = () => filterValue !== -1;

  return (
    <TextField
      className={clsx(className, classes.capitalize)}
      InputProps={{ className: clsx(isOn() && classes.highlight) }}
      label={t('group')}
      name="filterGroup"
      onChange={(e) => handleChange(Number(e.target.value))}
      select
      size="small"
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
