import { Box, Typography } from '@mui/material';
import { useAppState } from '@src/overmind';
import React, { FC } from 'react';

const Conversation: FC = () => {
  const { currentStory } = useAppState().chat;

  return (
    <Box pt={2} pb={4} px={3}>
      <Typography variant="overline">{currentStory?.synopsis}</Typography>
    </Box>
  );
};

export default Conversation;
