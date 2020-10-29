import { derived } from 'overmind';

export const state = {
  user: null,
  isSignedIn: derived((state) => state.user !== null),
  stories: null,
  story: null,
};
