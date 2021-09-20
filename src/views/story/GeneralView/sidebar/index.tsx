import { Box } from '@mui/material';
import { Story } from '@src/types';
import React, { FC } from 'react';
import StoryCard from './StoryCard';

interface SideBarProps {
  values: Story;
}

const SideBar: FC<SideBarProps> = ({ values }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
      <StoryCard values={values} />
    </Box>
  );
};

export default SideBar;
