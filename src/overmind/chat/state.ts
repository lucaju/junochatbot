import type { SpeechMessage, Story, Video } from '@src/types';
import { derived } from 'overmind';

type State = {
  _chatLog: { [x: string]: SpeechMessage };
  chatLog: SpeechMessage[];
  chatThreadLog: SpeechMessage[][];
  currentStory?: Story;
  currentVideo?: Video;
  debug: boolean;
  sessionid?: string;
  stories: Story[];
  videoLog: Video[];
  watchedVideos: Video[];
};

export const state: State = {
  _chatLog: {},
  chatLog: derived((state: State) => Object.values(state._chatLog)),
  chatThreadLog: [],
  debug: false,
  stories: [],
  videoLog: [],
  watchedVideos: [],
};
