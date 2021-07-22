import { Box, Typography, useTheme } from '@material-ui/core';
import type { SpeechMessage } from '@src/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect } from 'react';

interface SpeechBubbleUserProps {
  lastInThread: boolean;
  scrollConversation: () => void;
  speech: SpeechMessage;
}

const SpeechBubbleUser: FC<SpeechBubbleUserProps> = ({
  lastInThread,
  scrollConversation,
  speech,
}) => {
  const theme = useTheme();
  const { message } = speech;

  useEffect(() => {
    scrollConversation();
    return () => {};
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
        mb={lastInThread ? 4 : 0.5}
        mx={1}
        py={1}
        px={1.5}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomRightRadius: !lastInThread ? 0 : 8,
          borderBottomLeftRadius: 8,
        }}
      >
        <Typography align="right" sx={{ wordBreak: 'break-word' }} variant="body1">
          {message}
        </Typography>
      </Box>
    </AnimatePresence>
  );
};

export default SpeechBubbleUser;
