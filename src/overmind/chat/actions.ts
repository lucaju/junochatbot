import type {
  ErrorMessage,
  Message,
  QueryResult,
  SpeechMessage,
  Story,
  Video,
  VideoMessage,
} from '@src/types';
import { isError } from '@src/util/utilities';
import { Context } from '../';
import { v4 as uuidv4 } from 'uuid';
import { Duration } from 'luxon';

export const resetState = ({ state }: Context) => {
  state.chat.currentStory = undefined;
  state.chat.currentVideo = undefined;
  state.chat.chatLog = [];
  state.chat.sessionid = undefined;
  state.chat.videoLog = [];
  state.chat.watchedVideos = [];
};

export const getStories = async ({ state, effects }: Context): Promise<Story[]> => {
  const response = await effects.chat.api.getStories();
  if (isError(response)) return [];

  return response.reverse();
};

export const getStory = async (
  { actions, effects }: Context,
  storyId: number
): Promise<Story | ErrorMessage> => {
  const response = await effects.chat.api.getStory(storyId);
  if (isError(response)) return response;

  //? HACK TO DEAL WITH NULL INFO - REMOVE THIS WHEN FLUSH THE TEST DB
  if (response.botName === null) response.botName = 'Bot Name';
  if (response.botPersona === null) response.botPersona = 'Persona description';
  if (response.botAvatar === null) response.botAvatar = 'adb';

  actions.chat.setCurrentStory(response);

  return response;
};

export const setCurrentStory = ({ state }: Context, story: Story) => {
  state.chat.currentStory = { ...story };
};

export const setDebug = ({ state }: Context, value: boolean) => {
  state.chat.debug = value;
};

export const checkOwnership = async (
  { state, actions }: Context,
  storyId: number
): Promise<boolean> => {
  const userStories = await actions.story.getStoriesForAuthUser();
  if (isError(userStories)) return false;
  const userOwns = userStories.some((story) => story.id === storyId);
  return userOwns;
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

  const lastLog = state.chat.chatLog[state.chat.chatLog.length - 1];
  userSpeech.threadId = lastLog && lastLog.source === 'user' ? lastLog.threadId : uuidv4();

  state.chat.chatLog = [...state.chat.chatLog, userSpeech];

  actions.chat.detectedIntent(userInput);
};

export const detectedIntent = async ({ state, actions, effects }: Context, userInput: string) => {
  const storyId = state.chat.currentStory?.id;
  if (!storyId) return;

  //DETECT INTENT
  const response = await effects.chat.api.detectIntent(storyId, userInput, state.chat.sessionid);
  if (isError(response)) return response;

  if (!state.chat.sessionid) state.chat.sessionid = response.sessionid;

  const { queryResult } = response;
  if (!queryResult) return;
  // console.log(queryResult);

  const messages: SpeechMessage[] = await actions.chat._processMessages(queryResult);

  // console.log(messages);

  state.chat.chatLog = [...state.chat.chatLog, ...messages];
};

export const _processMessages = async ({ actions }: Context, queryResult: QueryResult) => {
  const { fulfillmentMessages } = queryResult;
  if (!fulfillmentMessages) return [] as SpeechMessage[];

  const messages: SpeechMessage[] = [];

  const threadId = uuidv4();

  const waitingTime = (i: number) => {
    if (i === 0) return 0;
    const prevWaitingtime = messages[i - 1].waitingTime ?? 0;
    const prevTypingtime = messages[i - 1].speechTime ?? 0;
    return prevWaitingtime + prevTypingtime;
  };

  for (let i: number = 0; i < fulfillmentMessages.length; i++) {
    const message: Message = fulfillmentMessages[i];

    const botSpeech: SpeechMessage = {
      id: uuidv4(),
      threadId,
      source: 'bot',
      metadata: queryResult,
      waitingTime: waitingTime(i),
    };

    botSpeech.type = 'text' in message ? 'text' : 'video';

    if ('text' in message) botSpeech.message = message.text?.text?.[0] ?? '';
    if ('payload' in message) botSpeech.video = await actions.chat.getVideo(message.payload);

    botSpeech.speechTime =
      botSpeech.type === 'text'
        ? actions.chat._getMessageTypingTime(botSpeech.message)
        : _getVideoDuration(botSpeech.video);

    messages.push(botSpeech);
  }

  return messages;
};

export const getVideo = async ({ actions }: Context, videoMessage: VideoMessage) => {
  const video =
    videoMessage.type == 'tag'
      ? actions.chat.getVideosByTag(videoMessage.source)
      : actions.chat.getVideoByID(videoMessage.source);

  return video;
};

export const getVideosByTag = async ({ state, effects }: Context, tagId: string) => {
  const storyId = state.chat.currentStory?.id;
  if (!storyId) return;

  const response = await effects.chat.api.getVideosBytag(storyId, Number(tagId));
  if (isError(response)) return;

  let unwatchedVideos = response.filter((video) => !state.chat.watchedVideos.includes(video));
  if (unwatchedVideos.length === 0) unwatchedVideos = response; // if all videos were watched, send all available videos back

  const randomPick = getRandomIntInclusive([0, unwatchedVideos.length - 1]);

  console.log(unwatchedVideos, randomPick, unwatchedVideos[randomPick]);

  const video = unwatchedVideos[randomPick];

  state.chat.videoLog = [...state.chat.videoLog, video];
  state.chat.watchedVideos = [...state.chat.watchedVideos, video];

  return video;
};

export const getVideoByID = async ({ state, effects }: Context, videoId: string) => {
  const storyId = state.chat.currentStory?.id;
  if (!storyId) return;

  //DETECT INTENT
  const response = await effects.chat.api.getVideo(storyId, Number(videoId));
  if (isError(response)) return;
  return response;
};

export const _getMessageTypingTime = ({ state }: Context, text: string = '') => {
  // Average human typying speed: 1 word/600ms;
  // Average characters per word: 5;
  // Average typing speed 1 character/120ms
  const botDelay = state.chat.currentStory?.botDelay ?? 100;

  const INITIAL_DELAY_RANGE = [200, 700]; // default: 200 - 700ms before start
  const typingDelay = [botDelay - 10, botDelay + 10]; // fuzziness: +/- the user setting for the bot

  const initialDelay = getRandomIntInclusive(INITIAL_DELAY_RANGE);
  const timePercaharacter = getRandomIntInclusive(typingDelay);

  const tpingTime = initialDelay + text.length * timePercaharacter;

  return tpingTime;
};

const getRandomIntInclusive = ([min, max]: number[]) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
};

const _getVideoDuration = (video?: Video) => {
  if (!video) return 0;
  const duration = Duration.fromISO(video.duration);
  return duration.as('milliseconds');
};

export const playVideo = async ({ state }: Context, video: Video) => {
  state.chat.currentVideo = { ...video } as Video;
};
