import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import StoryCard from './StoryCard';

const SideBar = ({ values }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <StoryCard values={values} />
    </Box>
  );
};

SideBar.propTypes = {
  values: PropTypes.object,
};

export default SideBar;
