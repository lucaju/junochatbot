import { Box, makeStyles, Typography } from '@material-ui/core';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import React, { FC } from 'react';
import type { Parameter as ParameterType } from '@src/types';

interface ParameterProps {
  parameter: ParameterType;
}

const useStyles = makeStyles(({ spacing }) => ({
  capitalize: {
    marginLeft: spacing(0.5),
    textTransform: 'capitalize'
  },
}));

const Parameter: FC<ParameterProps> = ({ parameter }) => {
  const classes = useStyles();

  const { displayName } = parameter;

  return (
    <Box display="flex" flexDirection="row" alignItems="flex-start" mb={1}>
      <EditAttributesIcon fontSize="small" />
      <Typography variant="body2" className={classes.capitalize}>
        {displayName}
      </Typography>
    </Box>
  );
};

export default Parameter;
