import type {
  ErrorMessage as IError,
  Message,
  QueryResult,
  SpeechMessage,
  Story,
  Video,
  VideoMessage,
} from '@src/types';
import { isError } from '@src/util/utilities';
import { Duration } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../';

export const resetState = ({ state }: Context) => {
  state.chat._chatLog = {};
  state.chat.chatThreadLog = [];
  state.chat.currentStory = undefined;
  state.chat.currentVideo = undefined;
  state.chat.debug = false;
  state.chat.sessionid = undefined;
  state.chat.videoLog = [];
  state.chat.watchedVideos = [];
};

export const getInitialProvocation = ({ state }: Context) => {
  return state.chat.currentStory?.languageCode === 'fr_CA' ? 'bonjour' : 'hello';
};

export const getStories = async ({ state, effects }: Context): Promise<Story[]> => {
  const response = await effects.chat.api.getStories();
  if (isError(response)) return [];

  state.chat.stories = response.reverse();

  return state.chat.stories;
};

export const getStory = async (
  { actions, effects }: Context,
  storyId: number
): Promise<Story | IError> => {
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

export const checkOwnership = async ({ actions }: Context, storyId: number): Promise<boolean> => {
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

  let lastThread = state.chat.chatThreadLog[state.chat.chatThreadLog.length - 1];
  const lastInThread = lastThread?.[lastThread?.length - 1] ?? undefined;
  if (lastInThread?.source === 'user') {
    lastThread = [...lastThread, userSpeech];
  } else {
    state.chat.chatThreadLog = [...state.chat.chatThreadLog, [userSpeech]];
  }

  state.chat._chatLog[userSpeech.id] = userSpeech;

  actions.chat.detectedIntent(userInput);
};

export const detectedIntent = async ({ state, actions, effects }: Context, userInput: string) => {
  const storyId = state.chat.currentStory?.id;
  if (!storyId) return;

  //get user token, if logged in
  const token = state.session.user?.token ?? undefined;

  //DETECT INTENT
  const response = await effects.chat.api.detectIntent({
    sessionid: state.chat.sessionid,
    storyId,
    text: userInput,
    token,
  });
  if (isError(response)) return response;

  if (!state.chat.sessionid) state.chat.sessionid = response.sessionid;

  const { queryResult } = response;
  if (!queryResult) return;

  const messages: SpeechMessage[] = await actions.chat._processMessages(queryResult);

  messages.forEach((message) => (state.chat._chatLog[message.id] = message));
};

export const _processMessages = async ({ state, actions }: Context, queryResult: QueryResult) => {
  const { fulfillmentMessages } = queryResult;
  if (!fulfillmentMessages) return [] as SpeechMessage[];

  const messages: SpeechMessage[] = [];

  let lastThread = state.chat.chatThreadLog[state.chat.chatThreadLog.length - 1];
  if (!lastThread) {
    state.chat.chatThreadLog = [...state.chat.chatThreadLog, []];
    lastThread = state.chat.chatThreadLog[state.chat.chatThreadLog.length - 1];
  } else {
    const lastInThread = lastThread[lastThread.length - 1];
    if (lastInThread?.source !== 'bot') {
      state.chat.chatThreadLog = [...state.chat.chatThreadLog, []];
      lastThread = state.chat.chatThreadLog[lastThread.length - 1];
    }
  }

  const waitingTime = (i: number) => {
    if (i === 0) return 0;
    const prevWaitingtime = messages[i - 1].waitingTime ?? 0;
    const prevTypingtime = messages[i - 1].speechTime ?? 0;
    return prevWaitingtime + prevTypingtime;
  };

  for (let i = 0; i < fulfillmentMessages.length; i++) {
    const message: Message = fulfillmentMessages[i];

    const botSpeech: SpeechMessage = {
      id: uuidv4(),
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
    if (botSpeech.type === 'text') lastThread.push(botSpeech);
  }

  return messages;
};

export const isLastInThread = ({ state }: Context, id: string) => {
  let isLast = false;

  for (const thread of state.chat.chatThreadLog) {
    const threadLength = thread.length;
    const speeachIndex = thread.findIndex((item) => item.id === id);
    if (speeachIndex === -1) continue;
    isLast = threadLength - 1 === speeachIndex;
    return isLast;
  }

  return isLast;
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

  //get user token, if logged in
  const token = state.session.user?.token ?? undefined;

  const response = await effects.chat.api.getVideosBytag(storyId, Number(tagId), token);
  if (isError(response)) return;

  let unwatchedVideos = response.filter((video) => !state.chat.watchedVideos.includes(video));
  if (unwatchedVideos.length === 0) unwatchedVideos = response; // if all videos were watched, send all available videos back

  const randomPick = getRandomIntInclusive([0, unwatchedVideos.length - 1]);

  const video = unwatchedVideos[randomPick];

  state.chat.videoLog = [...state.chat.videoLog, video];
  state.chat.watchedVideos = [...state.chat.watchedVideos, video];

  return video;
};

export const getVideoByID = async ({ state, effects }: Context, videoId: string) => {
  const storyId = state.chat.currentStory?.id;
  if (!storyId) return;

  //get user token, if logged in
  const token = state.session.user?.token ?? undefined;

  //DETECT INTENT
  const response = await effects.chat.api.getVideo(storyId, Number(videoId), token);
  if (isError(response)) return;
  return response;
};

export const _getMessageTypingTime = ({ state }: Context, text = '') => {
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

export const reset = async ({ state, actions, effects }: Context) => {
  const storyId = state.chat.currentStory?.id;
  if (!storyId) return;

  //get user token, if logged in
  const token = state.session.user?.token ?? undefined;

  //DETECT INTENT
  const response = await effects.chat.api.detectIntent({
    resetContexts: true,
    sessionid: state.chat.sessionid,
    storyId,
    text: 'reset',
    token,
  });
  if (isError(response)) return response;

  state.chat._chatLog = {};
  state.chat.chatThreadLog = [];
  state.chat.currentVideo = undefined;
  state.chat.sessionid = undefined;
  state.chat.videoLog = [];
  state.chat.watchedVideos = [];

  await actions.chat.detectedIntent(actions.chat.getInitialProvocation() ?? 'hello');
};
