import { useAppState } from '@src/overmind';
import React, { FC, memo } from 'react';
import SpeechBubbleBot from './SpeechBubbleBot';
import SpeechBubbleUser from './SpeechBubbleUser';

interface SpeechBubbleProps {
  scrollConversation: () => void;
  speechId: string;
}

const SpeechBubble: FC<SpeechBubbleProps> = memo(({ scrollConversation, speechId }) => {
  const source = useAppState((state) => state.chat._chatLog[speechId].source);

  return (
    <>
      {source === 'user' ? (
        <SpeechBubbleUser scrollConversation={scrollConversation} speechId={speechId} />
      ) : (
        <SpeechBubbleBot scrollConversation={scrollConversation} speechId={speechId} />
      )}
    </>
  );
});

export default SpeechBubble;
