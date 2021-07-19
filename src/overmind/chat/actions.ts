import type { ErrorMessage, SpeechMessage, Story, Video } from '@src/types';
import { isError } from '@src/util/utilities';
import { Context } from '../';
import { v4 as uuidv4 } from 'uuid';

export const getStories = async ({ state, effects }: Context): Promise<Story[] | ErrorMessage> => {
  const response = await effects.chat.api.getStories();

  if (isError(response)) return response;

  state.chat.stories = response.reverse();
  return state.story.stories;
};

export const getStory = async (
  { state, effects }: Context,
  storyId: number
): Promise<Story | ErrorMessage> => {
  const response = await effects.chat.api.getStory(storyId);
  if (isError(response)) return response;

  //? HACK TO DEAL WITH NULL INFO - REMOVE THIS WHEN FLUSH THE TEST DB
  if (response.botName === null) response.botName = 'Bot Name';
  if (response.botPersona === null) response.botPersona = 'Persona description';
  if (response.botAvatar === null) response.botAvatar = 'adb';

  state.chat.currentStory = response;

  return response;
};

export const submitUserInput = async ({ state, actions }: Context, userInput: string) => {
  const storyId = state.chat.currentStory?.id;
  if (!storyId) return;

  // USER INPUT
  const userSpeech: SpeechMessage = {
    id: uuidv4(),
    type: 'text',
    source: 'user',
    message: userInput,
  };

  state.chat.chatLog = [...state.chat.chatLog, userSpeech];

  actions.chat.detectedIntent(userInput);
};

export const detectedIntent = async ({ state, effects }: Context, userInput: string) => {
  const storyId = state.chat.currentStory?.id;
  if (!storyId) return;

  //DETECT INTENT
  const response = await effects.chat.api.detectIntent(storyId, userInput, state.chat.sessionid);
  if (isError(response)) return response;

  if (!state.chat.sessionid) state.chat.sessionid = response.sessionid;

  const { queryResult } = response;
  const { fulfillmentMessages } = queryResult;

  // console.log(queryResult);

  if (!fulfillmentMessages) return;

  const messages: SpeechMessage[] = [];

  fulfillmentMessages.forEach((message, i, array) => {
    let botSpeech: SpeechMessage;

    const waitingTime = () => {
      if (i === 0) return 0;
      const prevWaitingtime = messages[i - 1].waitingTime ?? 0;
      const prevTypingtime = messages[i - 1].typingTime ?? 0;
      return prevWaitingtime + prevTypingtime;
    };

    if ('text' in message) {
      const msg = message.text?.text?.[0] ?? '';
      const typingTime = processMessageTypingTime(msg, state.chat.currentStory?.botDelay);

      botSpeech = {
        id: uuidv4(),
        type: 'text',
        source: 'bot',
        message: msg,
        metadata: queryResult,
        typingTime,
        waitingTime: waitingTime(),
      };
    } else {
      botSpeech = {
        id: uuidv4(),
        type: 'payload',
        source: 'bot',
        payload: message.payload,
        metadata: queryResult,
        typingTime: 0,
        waitingTime: waitingTime(),
      };
    }

    messages.push(botSpeech);
  });

  // console.log(messages);

  state.chat.chatLog = [...state.chat.chatLog, ...messages];
};

const processMessageTypingTime = (text: string, botDelay: number = 100) => {
  // Average human typying speed: 1 word/600ms;
  // Average characters per word: 5;
  // Average typing speed 1 character/120ms
  const initialDelay = [200, 700]; // default: 200 - 700ms before start
  const typingDelay = [botDelay - 10, botDelay + 10]; // fuzziness: +/- the user setting for the bot

  const INITIAL_DELAY = getRandomIntInclusive(initialDelay);
  const TIME_PER_CHARACRTER = getRandomIntInclusive(typingDelay);

  return text.length * TIME_PER_CHARACRTER;
};

const processVideoTypingTime = (video: any, botDelay: number = 100) => {
  const durationParts = video.duration.split(':').reverse();
  const seconds = durationParts[0] * 1000; // in ms
  const minutes = durationParts[1] * 60 * 1000; // in ms

  return minutes + seconds;
};

const getRandomIntInclusive = ([min, max]: number[]) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
};

export const getVideosByTag = async ({ state, effects }: Context, tagId: string) => {
  const storyId = state.chat.currentStory?.id;
  if (!storyId) return;

  //DETECT INTENT
  const response = await effects.chat.api.getVideosBytag(storyId, Number(tagId));
  if (isError(response)) return;
  console.log(response);

  return response[0];
};

export const getVideo = async ({ state, effects }: Context, videoId: string) => {
  const storyId = state.chat.currentStory?.id;
  if (!storyId) return;

  //DETECT INTENT
  const response = await effects.chat.api.getVideo(storyId, Number(videoId));
  if (isError(response)) return;
  return response;
};

export const playVideo = async ({ state }: Context, video: Video) => {
  state.chat.currentVideo = video;
};

