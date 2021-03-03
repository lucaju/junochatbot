import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const Source = ({ parseVideoId }) => (
  <TextField
    fullWidth
    helperText={`Paste YouTube Video URL. E.g., "https://www.youtube.com/watch?v=XyNlqQId-nk"`}
    label="Source"
    onChange={(e) => parseVideoId(e.target.value)}
  />
);

Source.propTypes = {
  parseVideoId: PropTypes.func,
};

export default Source;
