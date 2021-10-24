import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import { Box, Typography } from '@mui/material';
import type { Context as ContextType } from '@src/types';
import React, { FC } from 'react';
import Context from './Context';

interface ContextProps {
  contexts: string[] | ContextType[];
  type: string;
}

const Contexts: FC<ContextProps> = ({ type, contexts }) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" mr={4}>
      <Box display="flex" flexDirection="row" alignItems="center" mr={0.5}>
        <CenterFocusWeakIcon fontSize="small" />
        <Typography sx={{ mx: 0.5, pt: 0.25 }} variant="overline">
          {type}
        </Typography>
      </Box>
      {contexts.map((context: string | ContextType, i: number) => (
        <Context
          key={i}
          lifespan={typeof context !== 'string' ? context.lifespanCount : 0}
          name={typeof context !== 'string' ? context.name : context}
          type={type}
        />
      ))}
    </Box>
  );
};

export default Contexts;
