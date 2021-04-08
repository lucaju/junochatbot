import mock from '../../mockData';
import { API_URL } from '../../config/config.js';
import type { ErrorMessage, Story } from '../../types';

const MOCKUP = true;

export const api = {
  // getUserAssets: async (
  //   userId: number,
  //   token: string
  // ): Promise<Story[] | ErrorMessage> => {

  //   const response = await fetch(`${API_URL}/story/${userId}/assets`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });

  //   if (!response.ok) return { errorMessage: response.statusText };

  //   const result = await response.json();
  //   return result as Asset[];
  // },

  getStories: async (): Promise<Story[] | ErrorMessage> => {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(mock.dataStories);
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(`${API_URL}/stories/all`);

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Story[];
  },

  getStory: async (storyId: number): Promise<Story | ErrorMessage> => {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(mock.storyExample);
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(`${API_URL}/stories/${storyId}`);

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Story;
  },

  createStory: async (
    story: Omit<Story, 'id'>,
    token: string
  ): Promise<Story | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(story),
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Story;
  },

  updateStory: async (
    storyId: number,
    story: Story,
    token: string
  ): Promise<Story | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories/${storyId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(story),
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Story;
  },

  deleteStory: async(
    storyId: number,
    token: string,
  ): Promise<boolean | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories/${storyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },
};
