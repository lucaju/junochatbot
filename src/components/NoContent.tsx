import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface NoContentProps {
  align?: 'left' | 'center' | 'right';
  heading?: string;
  size?: 'large' | 'medium' | 'small';
}

const NoContent: FC<NoContentProps> = ({ align = 'center', heading = '', size = 'medium' }) => {
  const { t } = useTranslation();

  if (heading === '') heading = t('common:noMatch');

  const marginTop = size === 'large' ? 4 : size === 'small' ? 2 : 3;
  const fontWeight = size === 'large' ? 700 : 500;
  const variant = size === 'large' ? 'h4' : size === 'small' ? 'h5' : 'h6';

  return (
    <Typography
      sx={{
        marginTop,
        color: ({ palette }) => palette.grey[700],
        textAlign: align,
        fontWeight,
        textTransform: 'uppercase',
      }}
      variant={variant}
    >
      {t(heading)}
    </Typography>
  );
};

export default NoContent;
