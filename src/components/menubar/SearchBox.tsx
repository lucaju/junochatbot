import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchBoxProps {
  handleSearch: (value: string) => void;
  disabled?: boolean;
  value?: string;
}

const SearchBox: FC<SearchBoxProps> = ({ handleSearch, disabled = false, value = '' }) => {
  const { t } = useTranslation('common');
  const [filterValue, setFilterValue] = useState(value);

  const handleChange = (value: string) => {
    setFilterValue(value);
    handleSearch(value);
  };

  const isOn = filterValue !== '';

  return (
    <TextField
      disabled={disabled}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon color={isOn ? 'primary' : undefined} fontSize="small" />
          </InputAdornment>
        ),
        sx: {
          color: ({ palette }) => (isOn ? palette.primary.main : undefined),
        },
      }}
      label={t('search')}
      name="filterSearch"
      onChange={(event) => handleChange(event.target.value)}
      size="small"
      sx={{ textTransform: 'capitalize' }}
      variant="outlined"
      value={filterValue}
    />
  );
};

export default SearchBox;
