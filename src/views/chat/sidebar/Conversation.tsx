import { Box, Stack } from '@mui/material';
import { useActions, useAppState } from '@src/overmind';
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import SpeechBubble from './SpeechBubble';
import Synopsis from './Synopsis';

const Conversation: FC = () => {
  const { chatLog, currentStory } = useAppState(({ chat }) => chat);
  const actions = useActions();
  const [scrollConversation, setScrollConversation] = useState(false);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!currentStory) return;
    const triggerBotMesssage = getInitialProvocation();
    const timer = setTimeout(() => actions.chat.detectedIntent(triggerBotMesssage), 1000);
    return () => clearTimeout(timer);
  }, [currentStory]);

  // update conversation
  useLayoutEffect(() => {
    if (!ref.current) return;
    if (scrollConversation) {
      ref.current.scrollTop = ref.current.scrollHeight;
      setScrollConversation(false);
    }
  }, [chatLog, scrollConversation]);

  const getInitialProvocation = () => {
    if (currentStory?.languageCode === 'fr_CA') return 'bonjour';
    if (currentStory?.languageCode === 'pt_BR') return 'olá';
    return 'hello';
  };

  const doScrollConversation = () => {
    setScrollConversation(true);
  };

  return (
    <Box ref={ref} height="100%" py={2} px={0.5} sx={{ overflow: 'auto' }}>
      {currentStory?.synopsis && <Synopsis />}
      <Stack justifyContent="flex-end" alignItems="baseline">
        {chatLog.map(({ id }) => (
          <SpeechBubble key={id} scrollConversation={doScrollConversation} speechId={id} />
        ))}
      </Stack>
    </Box>
  );
};

export default Conversation;
