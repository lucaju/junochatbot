import { Box, Typography } from '@material-ui/core';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import React, { FC } from 'react';
import type { Context as ContextType } from '../../../../types';
import Context from './Context';

interface ContextProps {
  type: string;
  contexts: string[] | ContextType[];
}

const Contexts: FC<ContextProps> = ({ type, contexts }) => (
  <Box mr={4} display="flex" flexDirection="row" alignItems="center">
    <Box mr={0.5} display="flex" flexDirection="row" alignItems="center">
      <CenterFocusWeakIcon fontSize="small" />
      <Typography variant="overline">{type}</Typography>
    </Box>
    {contexts.map((context: string | ContextType, i: number) => (
      <Context
        key={i}
        name={typeof context !== 'string' ? context.name : context}
        type={type}
        lifespan={typeof context !== 'string' ? context.lifespanCount : 0}
      />
    ))}
  </Box>
);

export default Contexts;
