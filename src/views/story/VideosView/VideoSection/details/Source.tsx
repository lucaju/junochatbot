import { TextField } from '@material-ui/core';
import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';

interface SourceProps {
  parseVideoUrl: (value: string) => void;
}

const Source: FC<SourceProps> = ({ parseVideoUrl }) => {
  const { t } = useTranslation();

  const helperText = `${t('videos:pasteVideo')}, "https://www.youtube.com/watch?v=XyNlqQId-nk"`;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    parseVideoUrl(value);
  };

  return (
    <TextField
      fullWidth
      helperText={helperText}
      label={t('videos:source')}
      onChange={onChange}
      variant="standard"
    />
  );
};

export default Source;
