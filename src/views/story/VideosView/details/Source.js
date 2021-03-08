import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Source = ({ parseVideoId }) => {
  const { t } = useTranslation(['videos']);
  return (
    <TextField
      fullWidth
      helperText={`Paste YouTube Video URL. E.g., "https://www.youtube.com/watch?v=XyNlqQId-nk"`}
      label={t('source')}
      onChange={(e) => parseVideoId(e.target.value)}
    />
  );
};

Source.propTypes = {
  parseVideoId: PropTypes.func,
};

export default Source;
