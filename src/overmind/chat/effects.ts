import mock from '@src/../test/mockData';
import { API_URL } from '@src/config/config.js';
import type { DetectIntentResponse, ErrorMessage, Story, Video } from '@src/types';

const MOCK_UP = false; //true;

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

  getStory: async (storyId: number): Promise<Story | ErrorMessage> => {
    if (MOCK_UP) {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(mock.dataStories[0]);
        }, 1000);
      });
    }

    const response = await fetch(`${API_URL}/chats/stories/${storyId}`);

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Story;
  },

  detectIntent: async (
    storyId: number,
    text: string,
    sessionid?: string
  ): Promise<DetectIntentResponse | ErrorMessage> => {
    // if (MOCK_UP) {
    //   return await new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(mock.dataStories[0]);
    //     }, 1000);
    //   });
    // }

    const body: { text: string; sessionid?: string } = { text };
    if (sessionid) body.sessionid = sessionid;

    const response = await fetch(`${API_URL}/chats/stories/${storyId}/intents/detect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();

    return result as DetectIntentResponse;
  },

  getVideo: async (storyId: number, viedoId: number): Promise<Video | ErrorMessage> => {
    // if (MOCK_UP) {
    //   return await new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(mock.dataStories[0]);
    //     }, 1000);
    //   });
    // }

    const response = await fetch(`${API_URL}/chats/stories/${storyId}/videos/${viedoId}`);

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();

    return result as Video;
  },

  getVideosBytag: async (storyId: number, tagId: number): Promise<Video[] | ErrorMessage> => {
    // if (MOCK_UP) {
    //   return await new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(mock.dataStories[0]);
    //     }, 1000);
    //   });
    // }

    const response = await fetch(`${API_URL}/chats/stories/${storyId}/tags/${tagId}/videos/all`);

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();

    return result as Video[];
  },
};
