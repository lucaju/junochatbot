import type { Story, SpeechMessage, Video } from '@src/types';

type State = {
  chatLog: SpeechMessage[];
  currentStory?: Story;
  currentVideo?: Video;
  debug: Boolean;
  sessionid?: string;
  stories:Story[]
  videoLog: Video[],
  watchedVideos : Video[],
};

export const state: State = {
  chatLog: [],
  debug: false,
  stories: [],
  videoLog: [],
  watchedVideos: [],
};
