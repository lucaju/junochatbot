import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { Story } from '../../../../types';
import StoryCard from './StoryCard';

interface SideBarProps {
  values: Story;
}

const SideBar: FC<SideBarProps> = ({ values }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <StoryCard values={values} />
    </Box>
  );
};

export default SideBar;
