import mock from '@src/../test/mockData';
import { API_URL } from '@src/config/config.js';
import type { ErrorMessage, Story } from '@src/types';

const MOCK_UP = true; //true;

export const api = {
  getStories: async (): Promise<Story[] | ErrorMessage> => {
    if (MOCK_UP) {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(mock.dataStories);
        }, 1000);
      });
    }

    const response = await fetch(`${API_URL}/chats/stories/all`);

    if (!response.ok) return { errorMessage: response.statusText };

    if (response.status === 204) return [] as Story[];

    const result = await response.json();
    return result as Story[];
  },
};
