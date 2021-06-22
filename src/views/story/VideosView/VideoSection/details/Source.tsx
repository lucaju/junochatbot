import { TextField } from '@material-ui/core';
import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';

interface SourceProps {
  parseVideoUrl: (value: string) => void;
}

const Source: FC<SourceProps> = ({ parseVideoUrl }) => {
  const { t } = useTranslation(['videos']);

  const helperText = `Paste YouTube Video URL. E.g., "https://www.youtube.com/watch?v=XyNlqQId-nk"`;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    parseVideoUrl(value);
  };

  return (
    <TextField
      fullWidth
      helperText={helperText}
      label={t('source')}
      onChange={onChange}
      variant="standard"
    />
  );
};

export default Source;
