import { Box, Typography } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import React, { FC } from 'react';

interface ContextProps {
  lifespan?: number;
  name: string;
  type?: string;
}

const Context: FC<ContextProps> = ({ lifespan = 0, name, type = 'input' }) => {
  const splitName = name.split('/');
  const text = splitName[splitName.length - 1];

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      borderRadius={16}
      mr={1}
      py={0.5}
      px={1.5}
      sx={{ width: 'max-content', backgroundColor: ({ palette }) => palette.action.hover }}
    >
      <Typography variant="body2">{text}</Typography>
      {type === 'output' && (
        <Box display="flex" flexDirection="row" alignItems="flex-end" ml={1} color="text.secondary">
          <TimerIcon fontSize="small" />
          <Typography align="center" variant="caption">
            {lifespan}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Context;
