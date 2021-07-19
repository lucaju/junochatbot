import type { Story, SpeechMessage, Video } from '@src/types';

type State = {
  stories: Story[];
  currentStory?: Story;
  currentVideo?: Video;
  chatLog: SpeechMessage[];
  sessionid?: string;
};

export const state: State = {
  stories: [],
  chatLog: [],
};
