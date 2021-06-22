import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface NoContentProps {
  heading?: string;
}

const NoContent: FC<NoContentProps> = ({ heading = 'noMatch' }) => {
  const { t } = useTranslation(['noContent']);

  return (
    <Typography
      sx={{
        marginTop: '50px',
        color: ({ palette }) => palette.grey[700],
        textAlign: 'center',
        fontWeight: 700,
        textTransform: 'uppercase',
      }}
      variant="h4"
    >
      {t(heading)}
    </Typography>
  );
};

export default NoContent;
