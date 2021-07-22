import { Box, Stack } from '@material-ui/core';
import { useActions, useAppState } from '@src/overmind';
import type { SpeechMessage } from '@src/types';
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import SpeechBubbleBot from './SpeechBubbleBot';
import SpeechBubbleUser from './SpeechBubbleUser';

const Conversation: FC = () => {
  const { chat } = useAppState();
  const actions = useActions();
  const [scrollConversation, setScrollConversation] = useState(false);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const timer = setTimeout(() => actions.chat.detectedIntent('hello'), 1000);
    return () => clearTimeout(timer);
  }, []);

  // update conversation
  useLayoutEffect(() => {
    if (!ref.current) return;
    if (scrollConversation) {
      ref.current.scrollTop = ref.current.scrollHeight;
      setScrollConversation(false);
    }
  }, [chat.chatLog, scrollConversation]);

  const isLastInThread = (speech: SpeechMessage, i: number) => {
    const isLastLog = i === chat.chatLog.length - 1;

    let lastInThread = isLastLog
      ? true
      : speech.threadId !== chat.chatLog[i + 1].threadId
      ? false
      : true;

    lastInThread = isLastLog || chat.chatLog[i + 1].video ? true : false;

    return lastInThread;
  };

  const doScrollConversation = () => {
    setScrollConversation(true);
  };

  return (
    <Box ref={ref} height="100%" py={2} px={0.5} sx={{ overflow: 'auto' }}>
      <Stack justifyContent="flex-end" alignItems="baseline">
        {chat.chatLog.map((speech, i) =>
          speech.source === 'user' ? (
            <SpeechBubbleUser
              key={speech.id}
              scrollConversation={doScrollConversation}
              speech={speech}
              lastInThread={isLastInThread(speech, i)}
            />
          ) : (
            <SpeechBubbleBot
              key={speech.id}
              scrollConversation={doScrollConversation}
              speech={speech}
              lastInThread={isLastInThread(speech, i)}
            />
          )
        )}
      </Stack>
    </Box>
  );
};

export default Conversation;
