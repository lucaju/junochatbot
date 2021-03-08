import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(({ palette }) => ({
  style: {
    marginTop: 50,
    color: palette.grey[700],
    textAlign: 'center',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

const NoContent = ({ heading = 'noMatch' }) => {
  const classes = useStyles();
  const { t } = useTranslation(['noContent']);
  
  return (
    <Typography className={classes.style} variant="h4">
      {t(heading)}
    </Typography>
  );
};

NoContent.DefaultProps = {
  heading: 'noMatch',
};

NoContent.propTypes = {
  heading: PropTypes.string,
};

export default NoContent;
