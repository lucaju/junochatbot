import { Message as MessageType, Payload, Text } from '@src/types';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../';

export const addTextMessage = ({ state, actions }: Context) => {
  if (!state.intents.currentIntent) return;
  const { currentIntent } = state.intents;
  const messages = currentIntent.messages ?? [];

  const last = messages[messages.length - 1];
  if (last && 'text' in last && last.text.text?.[0] === '') return;

  const newTextMessage: Text = {
    id: `new-${uuidv4()}`,
    text: { text: [''] },
  };

  currentIntent.messages = [...messages, newTextMessage];

  actions.intents.setIntentHaChange(true);
};

export const addVideoMessage = ({ state, actions }: Context) => {
  if (!state.intents.currentIntent) return;
  const { currentIntent } = state.intents;
  const messages = currentIntent.messages ?? [];

  const last = messages[messages.length - 1];
  if (last && 'payload' in last && last.payload.source === '-1') return;

  const newVideoMessage: Payload = {
    id: `new-${uuidv4()}`,
    payload: { type: 'video', source: '-1' },
  };

  currentIntent.messages = [...messages, newVideoMessage];

  actions.intents.setIntentHaChange(true);
};

export const addVideoTagMessage = ({ state, actions }: Context) => {
  if (!state.intents.currentIntent) return;
  const { currentIntent } = state.intents;
  const messages = currentIntent.messages ?? [];

  const last = messages[messages.length - 1];
  if (last && 'payload' in last && last.payload.source === '-1') return;

  const newVideoMessage: Payload = {
    id: `new-${uuidv4()}`,
    payload: { type: 'tag', source: '-1' },
  };

  currentIntent.messages = [...messages, newVideoMessage];

  actions.intents.setIntentHaChange(true);
};

export const removeMessage = ({ state, actions }: Context, id: string) => {
  if (!state.intents.currentIntent?.messages) return;
  const { messages } = state.intents.currentIntent;

  state.intents.currentIntent.messages = messages.filter((message) => message.id !== id);

  actions.intents.setIntentHaChange(true);
};

export const addTextMessageAlternative = ({ state, actions }: Context, messageId: string) => {
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

  actions.intents.setIntentHaChange(true);
};

export const updateTextMessageAlternative = (
  { state, actions }: Context,
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

  actions.intents.setIntentHaChange(true);
};

export const updateParameterInTextMessage = (
  { state, actions }: Context,
  { prevParamValue, newParamValue }: { prevParamValue: string; newParamValue: string }
) => {
  if (!state.intents.currentIntent?.messages) return;
  const messages = state.intents.currentIntent.messages;

  state.intents.currentIntent.messages = messages.map((msg) => {
    if ('text' in msg && msg.text.text) {
      msg.text.text = msg.text.text.map((txt) => {
        if (txt.includes(prevParamValue)) txt = txt.replace(prevParamValue, newParamValue);
        return txt;
      });
    }
    return msg;
  });

  actions.intents.setIntentHaChange(true);
};

export const removeTextMessageAlternative = (
  { state, actions }: Context,
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

  actions.intents.setIntentHaChange(true);
};

export const updateVideoSource = (
  { state, actions }: Context,
  { messageId, source }: { messageId?: string; source: string }
) => {
  if (!messageId) return;
  if (!state.intents.currentIntent?.messages) return;
  const { messages } = state.intents.currentIntent;

  const message = messages.find(({ id }) => id === messageId);
  if (!message) return;

  if ('payload' in message) message.payload.source = source;

  actions.intents.setIntentHaChange(true);
};

export const reorderMessages = ({ state, actions }: Context, reoderedMessages: MessageType[]) => {
  if (!state.intents.currentIntent?.messages) return;
  state.intents.currentIntent.messages = reoderedMessages;
  actions.intents.setIntentHaChange(true);
};
