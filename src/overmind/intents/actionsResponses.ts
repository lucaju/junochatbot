import { Message as MessageType, Payload, Text } from '@src/types';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../';

export const addTextMessage = ({ state }: Context) => {
  if (!state.intents.currentIntent) return;
  const { currentIntent } = state.intents;
  const messages = currentIntent.messages ?? [];

  const last = messages[messages.length - 1];
  if (last && 'text' in last && last.text.text?.[0] === '') return;

  const newTextMessage: Text = {
    id: `new-${uuidv4()}`,
    text: {
      text: [''],
    },
  };

  currentIntent.messages = [...messages, newTextMessage];
};

export const addVideoMessage = ({ state }: Context) => {
  if (!state.intents.currentIntent) return;
  const { currentIntent } = state.intents;
  const messages = currentIntent.messages ?? [];

  const last = messages[messages.length - 1];
  if (last && 'payload' in last && last.payload.source[0] === '') return;

  const newVideoMessage: Payload = {
    id: `new-${uuidv4()}`,
    payload: {
      type: 'tag',
      source: '-1',
    },
  };

  currentIntent.messages = [...messages, newVideoMessage];
};

export const removeMessage = ({ state }: Context, id: string) => {
  if (!state.intents.currentIntent?.messages) return;
  const { messages } = state.intents.currentIntent;

  state.intents.currentIntent.messages = messages.filter((message) => message.id !== id);
};

export const addTextMessageAlternative = ({ state }: Context, messageId: string) => {
  if (!state.intents.currentIntent) return;
  const { currentIntent } = state.intents;
  const messages = currentIntent.messages ?? [];

  const message = messages.find(({ id }) => id === messageId);
  if (!message) return;

  if ('text' in message) {
    const texts = message.text.text ?? [];
    if (texts[texts.length - 1] === '') return;

    message.text.text = [...texts, ''];
  }
};

export const updateTextMessageAlternative = (
  { state }: Context,
  {
    messageId,
    alternativeIndex,
    value,
  }: { messageId?: string; alternativeIndex: number; value: string }
) => {
  if (!messageId) return;
  if (!state.intents.currentIntent?.messages) return;
  const { messages } = state.intents.currentIntent;

  const message = messages.find(({ id }) => id === messageId);
  if (!message) return;

  if ('text' in message) {
    if (!message.text.text) return;
    message.text.text = message.text.text.map((text, i) => (i === alternativeIndex ? value : text));
  }
};

export const removeTextMessageAlternative = (
  { state }: Context,
  { messageId, alternativeIndex }: { messageId?: string; alternativeIndex: number }
) => {
  if (!messageId) return;
  if (!state.intents.currentIntent?.messages) return;
  const { messages } = state.intents.currentIntent;

  const message = messages.find(({ id }) => id === messageId);
  if (!message) return;

  if ('text' in message) {
    if (!message.text.text) return;
    message.text.text = message.text.text.filter((text, i) => i !== alternativeIndex);
  }
};

export const updateVideoSourceType = (
  { state, actions }: Context,
  { messageId, SourceType }: { messageId?: string; SourceType: 'tag' | 'video' }
) => {
  if (!messageId) return;
  if (!state.intents.currentIntent?.messages) return;
  const { messages } = state.intents.currentIntent;

  const message = messages.find(({ id }) => id === messageId);
  if (!message) return;

  if ('payload' in message) {
    message.payload.type = SourceType;
    actions.intents.updateVideoSource({ messageId, source: '-1' });
  }
};

export const updateVideoSource = (
  { state }: Context,
  { messageId, source }: { messageId?: string; source: string }
) => {
  if (!messageId) return;
  if (!state.intents.currentIntent?.messages) return;
  const { messages } = state.intents.currentIntent;

  const message = messages.find(({ id }) => id === messageId);
  if (!message) return;

  if ('payload' in message) message.payload.source = source;
};

export const reorderMessages = ({ state }: Context, reoderedMessages: MessageType[]) => {
  if (!state.intents.currentIntent?.messages) return;
  state.intents.currentIntent.messages = reoderedMessages;
};
