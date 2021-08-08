import { TextField } from '@material-ui/core';
import type { ErrorMessage } from '@src/types';
import { isError } from '@src/util/utilities';
import React, { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SourceProps {
  fetchVideo: (value: string) => Promise<ErrorMessage | void>;
}

const Source: FC<SourceProps> = ({ fetchVideo }) => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | undefined>();

  const helperText = `${t('videos:pasteVideo')}, "https://www.youtube.com/watch?v=XyNlqQId-nk"`;

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const response = await fetchVideo(value);
    if (response && isError(response)) setError(response.errorMessage);
  };

  return (
    <TextField
      autoFocus
      error={!!error}
      fullWidth
      helperText={error ? `${error}. ${helperText}` : ''}
      InputLabelProps={{ shrink: true }}
      label={t('videos:source')}
      onChange={onChange}
      placeholder={helperText}
      variant="standard"
    />
  );
};

export default Source;
