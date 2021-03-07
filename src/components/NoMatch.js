import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(({ palette }) => ({
  style: {
    marginTop: 50,
    color: palette.grey[700],
    textAlign: 'center',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

const NoMatch = ({ heading = 'No match' }) => {
  const classes = useStyles();
  
  return (
    <Typography className={classes.style} variant="h4">
      {heading}
    </Typography>
  );
};

NoMatch.DefaultProps = {
  heading: 'No match',
};

NoMatch.propTypes = {
  heading: PropTypes.string,
};

export default NoMatch;
