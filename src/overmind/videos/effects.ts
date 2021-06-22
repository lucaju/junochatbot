import mock from '@src/../test/mockData';
import { API_URL } from '@src/config/config.js';
import type { ErrorMessage, Tag, Video } from '@src/types';

const MOCK_UP = false;

export const api = {
  getVideos: async (storyId: number, token: string): Promise<Video[] | ErrorMessage> => {
    if (MOCK_UP) {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(mock.dataVideoCollection);
        }, 1000);
      });
    }

    const response = await fetch(`${API_URL}/stories/${storyId}/videos/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Video[];
  },

  getVideo: async (
    storyId: number,
    videoId: number,
    token: string
  ): Promise<Video | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories/${storyId}/videos/${videoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Video;
  },

  createVideo: async (
    storyId: number,
    video: Omit<Video, 'id'>,
    token: string
  ): Promise<Video | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories/${storyId}/videos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(video),
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Video;
  },

  async updateVideo(
    storyId: number,
    video: Partial<Video>,
    token: string
  ): Promise<Video | ErrorMessage> {
    const response = await fetch(`${API_URL}/stories/${storyId}/videos`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(video),
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Video;
  },

  deleteVideo: async (
    storyId: number,
    videoId: number,
    token: string
  ): Promise<boolean | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories/${storyId}/videos/${videoId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },

  // * YOUTUBE DATA ----------

  getYoutubeData: async (youtubeVideoId: string): Promise<Partial<Video> | ErrorMessage> => {
    const response = await fetch(`/youtube/video/${youtubeVideoId}`);

    if (!response.ok) return { errorMessage: response.statusText };
    const result = await response.json();

    return result as Partial<Video>;
  },

  // * TAGS ----------

  getTags: async (storyId: number, token: string): Promise<Tag[] | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories/${storyId}/tags/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Tag[];
  },

  getTag: async (storyId: number, tagId: number, token: string): Promise<Tag | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories/${storyId}/tags/${tagId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Tag;
  },

  getVideoTags: async (videoId: number, token: string): Promise<Tag[] | ErrorMessage> => {
    const response = await fetch(`${API_URL}/videos/${videoId}/tags/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Tag[];
  },

  createTag: async (
    storyId: number,
    tag: Omit<Tag, 'id'>,
    token: string
  ): Promise<Tag | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories/${storyId}/tags`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tag),
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Tag;
  },

  updateTag: async (storyId: number, tag: Tag, token: string): Promise<Tag | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories/${storyId}/tags`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tag),
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Tag;
  },

  deleteTag: async (
    storyId: number,
    tagId: number,
    token: string
  ): Promise<boolean | ErrorMessage> => {
    const response = await fetch(`${API_URL}/stories/${storyId}/tags/${tagId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },

  // * TAGS X VIDEOS----------

  addTagToVideo: async (
    videoId: number,
    tagId: number,
    token: string
  ): Promise<Tag | ErrorMessage> => {
    const response = await fetch(`${API_URL}/videos/${videoId}/tags/${tagId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Tag;
  },

  removeTagFromVideo: async (
    videoId: number,
    tagId: number,
    token: string
  ): Promise<boolean | ErrorMessage> => {
    const response = await fetch(`${API_URL}/videos/${videoId}/tags/${tagId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },
};
