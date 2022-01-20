import type { Language, Story } from '@src/types';

type State = {
  currentStory?: Story;
  icons: { value: string }[];
  languages: Language[];
  stories: Story[];
  userHasStory?: boolean;
};

export const state: State = {
  icons: [
    { value: 'adb' },
    { value: 'face' },
    { value: 'account' },
    { value: 'bug' },
    { value: 'child' },
  ],
  languages: [
    { value: 'en-CA', name: 'English' },
    { value: 'fr-CA', name: 'Français' },
    { value: 'pt-BR', name: 'Português' },
  ],
  stories: [],
};
