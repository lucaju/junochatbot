import { Stack } from '@mui/material';
import React, { FC } from 'react';
import Collection from './Collection';

const Contexts: FC = () => (
  <Stack spacing={3}>
    <Collection type="input" />
    <Collection type="output" />
  </Stack>
);

export default Contexts;
