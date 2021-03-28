import { Box, makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  style: { textTransform: 'uppercase' },
}));

const AlertInactive = ({ className }) => {
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

AlertInactive.propTypes = {
  className: PropTypes.Object,
};

export default AlertInactive;
