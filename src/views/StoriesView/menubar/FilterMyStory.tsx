import { ToggleButton } from '@mui/material';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type HandleFilterType = {
  type: string;
  value: number;
  reset?: boolean;
};

interface FilterMyStoryProps {
  handleFilter: ({ type, value, reset }: HandleFilterType) => void;
  value?: number;
}

const FilterMyStory: FC<FilterMyStoryProps> = ({ handleFilter, value = 0 }) => {
  const { t } = useTranslation();
  const [filterValue, setFilterValue] = useState(false);

  const handleChange = () => {
    const reset = filterValue;
    handleFilter({ type: 'user.id', value, reset });
    setFilterValue(!filterValue);
  };

  return (
    <ToggleButton
      onChange={handleChange}
      name="filterMyStory"
      selected={filterValue}
      size="small"
      sx={{ textTransform: 'uppercase' }}
      value="check"
    >
      {t('stories:myStory')}
    </ToggleButton>
  );
};

export default FilterMyStory;
