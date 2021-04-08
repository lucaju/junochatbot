import { makeStyles, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchBoxProps {
  className: string;
  handleSearch: (value: string) => void;
  disabled?: boolean;
  value?: string;
}

const useStyles = makeStyles(({ palette }) => ({
  capitalize: { textTransform: 'capitalize' },
  highlight: { color: palette.primary.main },
}));

const SearchBox: FC<SearchBoxProps> = ({
  className,
  handleSearch,
  disabled = false,
  value = '',
}) => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [filterValue, setFilterValue] = useState(value);

  const handleChange = (value: string) => {
    setFilterValue(value);
    handleSearch(value);
  };

  const isOn = () => filterValue !== '';

  return (
    <TextField
      className={clsx(classes.capitalize, className)}
      disabled={disabled}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon
              className={clsx(isOn() && classes.highlight)}
              fontSize="small"
            />
          </InputAdornment>
        ),
        className: clsx(isOn() && classes.highlight),
      }}
      label={t('Search')}
      name="filterSearch"
      onChange={(event) => handleChange(event.target.value)}
      size="small"
      variant="outlined"
      value={filterValue}
    />
  );
};

export default SearchBox;
