import { Box, Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import React from 'react';

const Toolbar = ({ handleDetailOpen }) => {
  return (
    <Box display="flex" justifyContent="flex-start">
      <Button
        color="primary"
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => handleDetailOpen(0)}
      >
        Add Video
      </Button>
    </Box>
  );
};

Toolbar.propTypes = {
  handleDetailOpen: PropTypes.func,
};

export default Toolbar;
