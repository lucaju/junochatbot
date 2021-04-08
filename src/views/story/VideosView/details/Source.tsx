import { TextField } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface SourceProps {
  parseVideoUrl: (value:string) => void;
}

const Source: FC<SourceProps> = ({ parseVideoUrl }) => {
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

export default Source;
