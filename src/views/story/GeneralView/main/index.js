import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Bot from './Bot';
import Story from './Story';
import Ui from './Ui';

const Main = ({ storyData }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Box mb={2} width={'100%'}>
        <Story storyData={storyData} />
      </Box>
      <Box mb={2} width={'100%'}>
        <Bot storyData={storyData} />
      </Box>
      <Box width={'100%'}>
        <Ui storyData={storyData} />
      </Box>
    </Box>
  );
};

Main.propTypes = {
  storyData: PropTypes.object,
};

export default Main;
