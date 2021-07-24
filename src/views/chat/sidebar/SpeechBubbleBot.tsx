import { Box, Stack, Typography, useTheme } from '@material-ui/core';
import { useActions, useAppState } from '@src/overmind';
import type { SpeechMessage } from '@src/types';
import { getIcon } from '@src/util/icons';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import TypingLoop from './TypingLoop';
import BotResponseDetails from './BotResponseDetails';

interface SpeechBubbleProps {
  lastInThread: boolean;
  scrollConversation: () => void;
  speech: SpeechMessage;
}

const SpeechBubble: FC<SpeechBubbleProps> = ({ lastInThread, scrollConversation, speech }) => {
  const { message, speechTime = 0, type = 'text', video, waitingTime = 0 } = speech;

  const { chat } = useAppState();
  const actions = useActions();
  const theme = useTheme();
  const BotAvatar = getIcon(chat.currentStory?.botAvatar ?? 'abd');
  const [showContent, setShowContent] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  const [debug, setDebug] = useState(true);

  useEffect(() => {
    waitingTime === 0 ? onWaitingTime() : timerWaiting();
    return () => {};
  }, []);

  const timerWaiting = () => setTimeout(() => onWaitingTime(), waitingTime);
  const timerSpeech = () => setTimeout(() => onSpeechTime(), speechTime);

  const onWaitingTime = () => {
    if (type === 'video') return displayVideo();
    setShowTyping(true);
    setShowContent(true);
    timerSpeech();
    scrollConversation();
  };

  const onSpeechTime = () => setShowTyping(false);

  const displayVideo = async () => {
    if (!video) return;
    actions.chat.playVideo(video);
  };

  const avatarAnimation = {
    initial: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const bubbleAnimation = {
    initial: { x: -500 },
    visible: { x: 0 },
  };

  return (
    <>
      {type === 'text' && (
        <AnimatePresence initial={false}>
          {showContent && (
            <Stack
              direction="row"
              maxWidth="75%"
              alignSelf="flex-start"
              alignItems="flex-end"
              mb={lastInThread ? 4 : 0.5}
              mx={1}
              px={lastInThread || showTyping ? 0 : 3.5}
            >
              {(lastInThread || showTyping) && (
                <Stack alignItems="center" mr={1}>
                  {lastInThread && debug && <BotResponseDetails debug={debug} speech={speech} />}
                  <BotAvatar
                    component={motion.svg}
                    variants={avatarAnimation}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    fontSize="small"
                  />
                </Stack>
              )}
              <Box
                component={motion.div}
                variants={bubbleAnimation}
                initial="initial"
                animate="visible"
                py={1}
                px={1.5}
                sx={{
                  minHeight: 32,
                  backgroundColor: theme.palette.grey[100],
                  color: theme.palette.grey[900],
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: !lastInThread ? 0 : 8,
                }}
              >
                {showTyping ? (
                  <TypingLoop />
                ) : (
                  <Typography align="left" sx={{ wordBreak: 'break-word' }} variant="body1">
                    {message}
                  </Typography>
                )}
              </Box>
            </Stack>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default SpeechBubble;
