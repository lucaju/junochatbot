import { Box, Stack, Typography, useTheme } from '@material-ui/core';
import { useAppState, useActions } from '@src/overmind';
import { getIcon } from '@src/util/icons';
import React, { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TypingLoop from './TypingLoop';
import type { VideoMessage } from '@src/types';

interface SpeechBubbleProps {
  message?: string;
  payload?: VideoMessage;
  sourceSameAsNext: boolean;
  sourceSameAsPrevious: boolean;
  type: 'text' | 'payload';
  typingTime?: number;
  waitingTime?: number;
}

const SpeechBubble: FC<SpeechBubbleProps> = ({
  message = '',
  payload,
  sourceSameAsNext,
  sourceSameAsPrevious,
  type,
  typingTime = 0,
  waitingTime = 0,
}) => {
  const { chat } = useAppState();
  const actions = useActions();
  const theme = useTheme();
  const BotAvatar = getIcon(chat.currentStory?.botAvatar ?? 'abd');
  const [showContent, setShowContent] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    waitingTime === 0 ? onWaitingTime() : timerWaiting();
    return () => {};
  }, []);

  const timerWaiting = () => setTimeout(() => onWaitingTime(), waitingTime);
  const timerTyping = () => setTimeout(() => onTypingTime(), typingTime);

  const onWaitingTime = () => {
    if (type === 'payload') return displayVideo();
    setShowTyping(true);
    setShowContent(true);
    timerTyping();
  };

  const onTypingTime = () => setShowTyping(false);

  const displayVideo = async () => {
    if (!payload) return;
    const video = payload.type === 'tag'
      ? await actions.chat.getVideosByTag(payload.source)
      : await actions.chat.getVideo(payload.source);

    console.log(video);
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
              mt={!sourceSameAsPrevious ? 4 : 0.5}
              mx={1}
              px={showTyping ? 0 : sourceSameAsNext ? 3.5 : 0}
            >
              {(!sourceSameAsNext || showTyping) && (
                <BotAvatar
                  component={motion.svg}
                  variants={avatarAnimation}
                  initial="initial"
                  animate="visible"
                  exit="exit"
                  fontSize="small"
                  sx={{ mr: 1 }}
                />
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
                  borderBottomLeftRadius: !sourceSameAsNext ? 0 : 8,
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
