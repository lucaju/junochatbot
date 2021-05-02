import { Box, makeStyles, Typography } from '@material-ui/core';
import NfcRoundedIcon from '@material-ui/icons/NfcRounded';
import React, { FC } from 'react';
import type { Parameter as ParameterType } from '../../../../types';

interface ParameterProps {
  parameter: ParameterType;
}

const useStyles = makeStyles(({ palette }) => ({
  content: { backgroundColor: palette.action.hover },
}));

const Parameter: FC<ParameterProps> = ({ parameter }) => {
  const classes = useStyles();

  const { displayName, entityTypeDisplayName } = parameter;

  return (
    <Box display="flex" flexDirection="row" alignItems="flex-start" mb={1}>
      <NfcRoundedIcon fontSize="small" color="disabled" />
      <Typography variant="body2">
        {`${displayName} (${entityTypeDisplayName})`}
      </Typography>
    </Box>
  );
};

export default Parameter;
