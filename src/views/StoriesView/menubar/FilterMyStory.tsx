import { ToggleButton } from '@material-ui/core';
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
  const { t } = useTranslation(['stories']);
  const [filterValue, setFilterValue] = useState(false);

  const handleChange = () => {
    const reset = filterValue;
    handleFilter({ type: 'user.id', value, reset });
    setFilterValue(!filterValue);
  };

  const isOn = () => filterValue === true;

  return (
    <ToggleButton
      // classes={{
      //   selected: {
      //     color: 'primary',
      //     borderColor: 'primary',
      //     backgroundColor: 'background.default',
      //   },
      // }}
      onChange={handleChange}
      name="filterMyStory"
      selected={filterValue}
      size="small"
      sx={{ textTransform: 'uppercase' }}
      value="check"
    >
      {t('myStory')}
    </ToggleButton>
  );
};

export default FilterMyStory;
