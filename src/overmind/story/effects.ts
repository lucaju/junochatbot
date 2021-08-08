import mock from '@src/../test/mockData';
import { API_URL } from '@src/config/config.js';
import type { ErrorMessage, Story } from '@src/types';

type ResponseUploadImage = {
  fileName: string;
};

const MOCK_UP = false; //true;

export const api = {
  getAllStories: async (token: string): Promise<Story[] | ErrorMessage> => {
    if (MOCK_UP) {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(mock.dataStories);
        }, 1000);
      });
    }

    const response = await fetch(`${API_URL}/stories/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    if (response.status === 204) return [] as Story[];

    const result = await response.json();
    return result as Story[];
  },

  getStoriesByGroup: async (groupId: number, token: string): Promise<Story[] | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    if (response.status === 204) return [] as Story[];

    const result = await response.json();
    return result as Story[];
  },

  getStoriesByUser: async (userId: number, token: string): Promise<Story[] | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    if (response.status === 204) return [] as Story[];

    const result = await response.json();
    return result as Story[];
  },

  getStory: async (storyId: number, token: string): Promise<Story | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories/${storyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Story;
  },

  createStory: async (
    story: Omit<Story, 'id'>,
    userId: number,
    token: string
  ): Promise<Story | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories/user/${userId}`, {
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

  updateStory: async (story: Partial<Story>, token: string): Promise<Story | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories`, {
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

  uploadImage: async (
    storyId: number,
    image: any,
    token: string
  ): Promise<ResponseUploadImage | ErrorMessage> => {
    const formData = new FormData();
    formData.append('file', image);

    const response = await fetch(`${API_URL}/stories/${storyId}/image`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as ResponseUploadImage;
  },

  deleteImage: async (storyId: number, token: string): Promise<boolean | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories/${storyId}/image`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },
  
};
