import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '@src/overmind';

interface FilterTagProps {
  className: string;
  handleFilter: (value: number) => void;
  value?: number;
}

const useStyles = makeStyles(({ palette }) => ({
  capitalize: { textTransform: 'capitalize' },
  highlight: { color: palette.primary.main },
}));

const FilterTag: FC<FilterTagProps> = ({
  className,
  handleFilter,
  value = -1,
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const { t } = useTranslation(['common']);
  const [tags, setTags] = useState([{ id: -1, name: 'all' }]);
  const [filterValue, setFilterValue] = useState(value);

  useEffect(() => {
    setTags([{ id: -1, name: 'all' }, ...state.videos.tagCollection]);
    return () => {};
  }, [state.videos.tagCollection]);

  const handleChange = (value: number) => {
    setFilterValue(value);
    handleFilter(value);
  };

  const isOn = () => filterValue !== -1;

  return (
    <TextField
      className={clsx(className, classes.capitalize)}
      InputProps={{ className: clsx(isOn() && classes.highlight) }}
      label={t('tag')}
      name="filterTag"
      onChange={(e) => handleChange(Number(e.target.value))}
      select
      size="small"
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
