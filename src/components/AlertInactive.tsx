import { createStyles, Box, makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface AlertInactiveProps {
  className: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    style: { textTransform: 'uppercase' },
  })
);

const AlertInactive: FC<AlertInactiveProps> = ({ className }) => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);

  return (
    <Box className={className}>
      <Alert className={classes.style} severity="warning">
        {t('inactive')}
      </Alert>
    </Box>
  );
};

export default AlertInactive;
