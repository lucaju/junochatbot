import { makeStyles } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type HandleFilterType = {
  type: string;
  value: number;
  reset?: boolean;
};

interface FilterMyStoryProps {
  handleFilter: ({ type, value, reset }: HandleFilterType) => void;
  className?: string;
  value?: number;
}

const useStyles = makeStyles(({ palette }) => ({
  capitalize: { textTransform: 'uppercase' },
  highlight: {
    color: `${palette.primary.main} !important`,
    borderColor: `${palette.primary.main} !important`,
    backgroundColor: `${palette.background.default} !important`,
    // color: `${palette.common.white} !important`,
    // backgroundColor: `${palette.primary.main} !important`,
  },
}));

const FilterMyStory: FC<FilterMyStoryProps> = ({
  handleFilter,
  className = '',
  value = 0,
}) => {
  const classes = useStyles();
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
      className={clsx(className, classes.capitalize)}
      classes={{
        selected: classes.highlight,
      }}
      name="filterMyStory"
      value="check"
      selected={filterValue}
      onChange={handleChange}
      size="small"
    >
      {t('myStory')}
    </ToggleButton>
  );
};

export default FilterMyStory;
