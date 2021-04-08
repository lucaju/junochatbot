import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, useState } from 'react';
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
  className?: string;
  value?: number;
}

const useStyles = makeStyles(({ palette }) => ({
  box: { width: 125 },
  capitalize: { textTransform: 'capitalize' },
  highlight: { color: palette.primary.main },
}));

const options: Option[] = [
  { value: 0, name: 'all' },
  { value: 1, name: 'published' },
  { value: -1, name: 'draft' },
];

const FilterPublished: FC<FilterPublishedProps> = ({
  handleFilter,
  className = '',
  value = 1,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['stories']);
  const [filterValue, setFilterValue] = useState(value);

  const handleChange = (value: number) => {
    setFilterValue(value);
    const reset = value === 0 ? true : false;
    handleFilter({ type: 'published', value, reset });
  };

  const isOn = () => filterValue !== -1;

  return (
    <TextField
      className={clsx(className, classes.box, classes.capitalize)}
      InputProps={{ className: clsx(isOn() && classes.highlight) }}
      label={t('status')}
      name="filterPublished"
      onChange={(event) => handleChange(Number(event.target.value))}
      select
      size="small"
      variant="outlined"
      value={filterValue}
    >
      {options.map(({ name, value }) => (
        <MenuItem className={classes.capitalize} key={value} value={value}>
          {t(name)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FilterPublished;
