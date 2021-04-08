import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HandleFilterType } from '../../types';

type Option = {
  value: number;
  name: string;
};

interface FilterStatusProps {
  handleFilter: ({ type, value, reset }: HandleFilterType) => void;
  value?: number;
}

const useStyles = makeStyles(({ palette }) => ({
  box: { width: 105 },
  capitalize: { textTransform: 'capitalize' },
  highlight: { color: palette.primary.main },
}));

const options: Option[] = [
  { value: 0, name: 'all' },
  { value: 1, name: 'active' },
  { value: -1, name: 'inactive' },
];

const FilterStatus: FC<FilterStatusProps> = ({
  handleFilter,
  value = 1,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);
  const [filterValue, setFilterValue] = useState(value);

  const handleChange = (value: number) => {
    setFilterValue(value);
    const reset = value === 0 ? true : false;
    handleFilter({ type: 'active', value, reset });
  };

  const isOn = () => filterValue !== 0;

  return (
    <TextField
      className={clsx(classes.box, classes.capitalize)}
      InputProps={{ className: clsx(isOn() && classes.highlight) }}
      label={t('status')}
      name="filterStatus"
      onChange={(event) => handleChange(Number(event.target.value))}
      select
      size="small"
      variant="outlined"
      value={filterValue}
    >
      {options.map(({ name, value }) => (
        <MenuItem className={classes.capitalize} key={name} value={value}>
          {t(name)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FilterStatus;
