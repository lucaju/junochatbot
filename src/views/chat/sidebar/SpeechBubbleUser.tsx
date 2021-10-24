/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { Box, Typography, useTheme } from '@mui/material';
import { useActions, useAppState } from '@src/overmind';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, memo, useEffect, useState } from 'react';

interface SpeechBubbleUserProps {
  scrollConversation: () => void;
  speechId: string;
}

const SpeechBubbleUser: FC<SpeechBubbleUserProps> = memo(({ scrollConversation, speechId }) => {
  const theme = useTheme();
  const actions = useActions();
  const { id, message } = useAppState((state) => state.chat._chatLog[speechId]);
  const [isLastInThread, setIsLastInThread] = useState(false);

  useEffect(() => {
    setIsLastInThread(actions.chat.isLastInThread(id));
    scrollConversation();
  }, []);

  const bubbleAnimation = {
    initial: { x: 500 },
    visible: { x: 0 },
  };

  return (
    <AnimatePresence>
      <Box
        component={motion.div}
        variants={bubbleAnimation}
        initial="initial"
        animate="visible"
        alignSelf="flex-end"
        maxWidth="75%"
        mb={isLastInThread ? 4 : 0.5}
        mx={1}
        py={1}
        px={1.5}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomRightRadius: !isLastInThread ? 0 : 8,
          borderBottomLeftRadius: 8,
        }}
      >
        <Typography align="right" sx={{ wordBreak: 'break-word' }} variant="body1">
          {message}
        </Typography>
      </Box>
    </AnimatePresence>
  );
});

export default SpeechBubbleUser;
