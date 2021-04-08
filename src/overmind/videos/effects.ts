import mock from '../../mockData';
import { API_URL } from '../../config/config.js';
import type { ErrorMessage, Video, Tag } from '../../types';

const MOCKUP = true;

export const api = {
  getVideos: async (
    storyId: number,
    token: string
  ): Promise<Video[] | ErrorMessage> => {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(mock.dataVideoCollection);
        }, 1000);
      });
    }
    // -----------

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
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          const video = mock.dataVideoCollection.find(
            (video) => video.id === videoId
          );
          video ? resolve(video) : reject();
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(
      `${API_URL}/stories/${storyId}/videos/${videoId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Video;
  },

  createVideo: async (
    storyId: number,
    video: Omit<Video, 'id'>,
    token: string
  ): Promise<Video | ErrorMessage> => {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          const newVideo: Video = { 
            ...video,
            id: mock.dataVideoCollection.length + 1,
            active: true
          };
          mock.dataVideoCollection = [newVideo, ...mock.dataVideoCollection];
          resolve(newVideo);
        }, 1000);
      });
    }
    // -----------

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
    video: Video,
    token: string
  ): Promise<Video | ErrorMessage> {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          mock.dataVideoCollection = mock.dataVideoCollection.map(
            (v: Video) => {
              if (video.id === v.id) v = video;
              return v;
            }
          );
          resolve(video);
        }, 1000);
      });
    }
    // -----------

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
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          mock.dataVideoCollection = mock.dataVideoCollection.filter(
            (video: Video) => video.id !== videoId
          );
          resolve(true);
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(
      `${API_URL}/stories/${storyId}/videos/${videoId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },

  // * YOUTUBE DATA ----------

  getYoutubeData: async (
    youtubeVideoId: string
  ): Promise<Partial<Video> | ErrorMessage> => {
    const response = await fetch(`/youtube/video/${youtubeVideoId}`);

    if (!response.ok) return { errorMessage: response.statusText };
    const result = await response.json();

    return result as Partial<Video>;
  },

  // * TAGS ----------

  getTags: async (
    storyId: number,
    token: string
  ): Promise<Tag[] | ErrorMessage> => {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(mock.dataTags);
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(
      `${API_URL}/stories/${storyId}/videos/tags/all`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Tag[];
  },

  getTag: async (
    storyId: number,
    tagId: number,
    token: string
  ): Promise<Tag | ErrorMessage> => {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          const tag = mock.dataTags.find((tag: Tag) => tag.id === tagId);
          tag ? resolve(tag) : reject();
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(
      `${API_URL}/stories/${storyId}/videos/tags/${tagId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Tag;
  },

  getVideoTags: async (
    videoId: number,
    token: string
  ): Promise<Tag[] | ErrorMessage> => {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(mock.dataTags);
        }, 1000);
      });
    }
    // -----------

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
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          const newTag: Tag = { 
            ...tag,
            id: mock.dataTags.length + 1,
            active: true
          };
          mock.dataTags = [newTag, ...mock.dataTags];
          resolve(newTag);
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(`${API_URL}/stories/${storyId}/tag`, {
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

  updateTag: async (
    storyId: number,
    tag: Tag,
    token: string
  ): Promise<Tag | ErrorMessage> => {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          mock.dataTags = mock.dataTags.map((t: Tag) => {
            if (tag.id === t.id) t = tag;
            return t;
          });
          resolve(tag);
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(`${API_URL}/stories/${storyId}/tag`, {
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
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          mock.dataTags = mock.dataTags.filter((tag: Tag) => tag.id !== tagId);
          resolve(true);
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(`${API_URL}/stories/${storyId}/tag/${tagId}`, {
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
