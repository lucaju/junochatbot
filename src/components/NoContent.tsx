import { makeStyles, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface NoContentProps {
  heading?: string;
}

const useStyles = makeStyles(({ palette }) => ({
  style: {
    marginTop: 50,
    color: palette.grey[700],
    textAlign: 'center',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

const NoContent: FC<NoContentProps> = ({ heading = 'noMatch' }) => {
  const classes = useStyles();
  const { t } = useTranslation(['noContent']);
  
  return (
    <Typography className={classes.style} variant="h4">
      {t(heading)}
    </Typography>
  );
};

export default NoContent;
