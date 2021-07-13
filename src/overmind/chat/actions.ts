import type { ErrorMessage, Story } from '@src/types';
import { isError } from '@src/util/utilities';
import { Context } from '../';

export const getStories = async ({ state, effects }: Context): Promise<Story[] | ErrorMessage> => {

  const response = await effects.chat.api.getStories();
  console.log(response)

  if (isError(response)) return response;

  state.chat.stories = response.reverse();
  return state.story.stories;
};
