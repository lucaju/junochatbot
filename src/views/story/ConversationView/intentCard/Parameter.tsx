import { Box, Typography } from '@mui/material';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import type { Parameter as ParameterType } from '@src/types';
import React, { FC } from 'react';

interface ParameterProps {
  parameter: ParameterType;
}

const Parameter: FC<ParameterProps> = ({ parameter }) => {
  const { displayName } = parameter;

  return (
    <Box display="flex" flexDirection="row" alignItems="flex-start" mb={1}>
      <EditAttributesIcon fontSize="small" />
      <Typography
        variant="body2"
        sx={{
          ml: 0.5,
          textTransform: 'capitalize',
        }}
      >
        {displayName}
      </Typography>
    </Box>
  );
};

export default Parameter;
