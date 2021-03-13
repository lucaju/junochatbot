import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Source = ({ parseVideoUrl }) => {
  const { t } = useTranslation(['videos']);
  return (
    <TextField
      fullWidth
      helperText={`Paste YouTube Video URL. E.g., "https://www.youtube.com/watch?v=XyNlqQId-nk"`}
      label={t('source')}
      onChange={(e) => parseVideoUrl(e.target.value)}
    />
  );
};

Source.propTypes = {
  parseVideoUrl: PropTypes.func,
};

export default Source;
