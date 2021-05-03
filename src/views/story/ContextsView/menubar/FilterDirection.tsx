import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '@src/overmind';
import { HandleFilterType } from '@src/types';

interface FilterDirectionProps {
  handleFilter: ({ type, value, reset }: HandleFilterType) => void;
  className?: string;
  value?: string;
}

const useStyles = makeStyles(({ palette }) => ({
  capitalize: { textTransform: 'capitalize' },
  highlight: { color: palette.primary.main },
}));

const options = ['All', 'In', 'Out'];

const FilterDirection: FC<FilterDirectionProps> = ({
  className,
  handleFilter,
  value = 'All',
}) => {
  const classes = useStyles();
  const { state } = useApp();
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
      className={clsx(className, classes.capitalize)}
      InputProps={{ className: clsx(isOn && classes.highlight) }}
      label={t('direction')}
      name="filterEntityCategory"
      onChange={(e) => handleChange(e.target.value)}
      select
      size="small"
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
