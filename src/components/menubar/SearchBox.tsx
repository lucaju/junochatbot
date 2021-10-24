import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchBoxProps {
  handleSearch: (value: string) => void;
  disabled?: boolean;
  value?: string;
}

const SearchBox: FC<SearchBoxProps> = ({ handleSearch, disabled = false, value = '' }) => {
  const { t } = useTranslation();
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
      label={t('common:search')}
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
