import { Box, Stack } from '@material-ui/core';
import React, { FC, useEffect, useLayoutEffect } from 'react';
import { useAppState, useActions } from '@src/overmind';
import SpeechBubbleBot from './SpeechBubbleBot';
import SpeechBubbleUser from './SpeechBubbleUser';

const Conversation: FC = () => {
  const { chat } = useAppState();
  const actions = useActions();

  useEffect(() => {
		const timer = setTimeout(() => actions.chat.detectedIntent('hello'), 1000);
		return () => clearTimeout(timer);
	}, []);

  return (
    <Box height="100%" py={2} px={0.5} sx={{ overflow: 'auto' }}>
      <Stack
        // height="100%"
        justifyContent="flex-end"
        alignItems="baseline"
      >
        {chat.chatLog.map(({ id, type, source, message, payload, typingTime, waitingTime }, i) => {
          const sameAsPrevious = i > 0 && chat.chatLog[i - 1].source === source ? true : false;
          const sameAsNext =
            i < chat.chatLog.length - 1 && chat.chatLog[i + 1].source === source ? true : false;
          if (source === 'user') {
            return (
              <SpeechBubbleUser
                key={id}
                message={message}
                sourceSameAsPrevious={sameAsPrevious}
                sourceSameAsNext={sameAsNext}
              />
            );
          } else {
            return (
              <SpeechBubbleBot
                key={id}
                message={message}
                payload={payload}
                sourceSameAsPrevious={sameAsPrevious}
                sourceSameAsNext={sameAsNext}
                type={type}
                typingTime={typingTime}
                waitingTime={waitingTime}
              />
            );
          }
        })}
      </Stack>
    </Box>
  );
};

export default Conversation;
