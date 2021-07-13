import type { Story } from '@src/types';

type State = {
  stories: Story[];
  currentStory?: Story;
};

export const state: State = {
  stories: [] as Story[],
};
