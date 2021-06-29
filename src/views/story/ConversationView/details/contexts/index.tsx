import { Stack } from '@material-ui/core';
import React, { FC } from 'react';
import Collection from './Collection';

const Contexts: FC = () => (
  <Stack spacing={3}>
    <Collection type="input" />
    <Collection type="output" />
  </Stack>
);

export default Contexts;
