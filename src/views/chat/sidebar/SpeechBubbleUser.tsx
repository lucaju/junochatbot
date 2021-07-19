import { Box, Typography, useTheme } from '@material-ui/core';
import { useAppState } from '@src/overmind';
import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface SpeechBubbleUserProps {
  message?: string;
  sourceSameAsNext: boolean;
  sourceSameAsPrevious: boolean;
}

const SpeechBubbleUser: FC<SpeechBubbleUserProps> = ({
  message = '',
  sourceSameAsNext,
  sourceSameAsPrevious,
}) => {
  const { chat } = useAppState();
  const theme = useTheme();

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
        mt={!sourceSameAsPrevious ? 4 : 0.5}
        mx={1}
        py={1}
        px={1.5}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomRightRadius: !sourceSameAsNext ? 0 : 8,
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
