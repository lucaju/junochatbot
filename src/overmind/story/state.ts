import type { Language, Story } from '@src/types';

type State = {
  stories: Story[];
  currentStory?: Story;
  languages: Language[];
  icons: { value: string }[];
};

export const state: State = {
  stories: [] as Story[],
  languages: [
    { value: 'en-CA', name: 'English' },
    { value: 'fr-CA', name: 'French' },
  ],
  icons: [
    { value: 'adb' },
    { value: 'face' },
    { value: 'account' },
    { value: 'bug' },
    { value: 'child' },
  ],
};
