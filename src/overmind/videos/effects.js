import mock from 'src/mockData';
import { API_URL } from '../../config/config.js';

const MOCKUP = true;

export const api = {
  async getVideos({ storyId, token }) {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(resolve(mock.dataVideoCollection));
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(
      `${API_URL}/application/stories/${storyId}/videos/all`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async getVideo({ videoId, storyId, token }) {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          const video = mock.dataVideoCollection.find(
            (video) => video.id === videoId
          );
          resolve(resolve(video));
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(
      `${API_URL}/application/stories/${storyId}/videos/${videoId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async createVideo({ storyId, video, token }) {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          video.id = mock.dataVideoCollection.length + 1;
          resolve(resolve(video));
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(
      `${API_URL}/application/stories/${storyId}/videos`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(video),
      }
    );

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async updateVideo({ storyId, video, token }) {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          mock.dataVideoCollection = mock.dataVideoCollection.map((v) => {
            if (video.id === v.id) return video;
            return v;
          });
          resolve(resolve(video));
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(
      `${API_URL}/application/stories/${storyId}/videos`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(video),
      }
    );

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async deleteVideo({ storyId, videoId, token }) {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          mock.dataVideoCollection = mock.dataVideoCollection.filter(
            (video) => video.id !== videoId
          );
          resolve(resolve(videoId));
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(
      `${API_URL}/application/stories/${storyId}/videos/${videoId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  // * YOUTUBE DATA ----------

  async getYoutubeData(youtubeVideoId) {
    const response = await fetch(`/youtube/video/${youtubeVideoId}`);

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  // * TAGS ----------

  async getTags({ storyId, token }) {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(resolve(mock.dataTags));
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(
      `${API_URL}/application/stories/${storyId}/videos/tags/all`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async getTag({ tagId, storyId, token }) {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          const tag = mock.dataTags.find((tag) => tag.id === tagId);
          resolve(resolve(tag));
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(
      `${API_URL}/application/stories/${storyId}/videos/tags/${tagId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async createTag({ tag, storyId, token }) {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          tag.id = mock.dataTags.length + 1;
          resolve(resolve(tag));
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(
      `${API_URL}/application/stories/${storyId}/videos/tag`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tag),
      }
    );

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async updateTag({ tag, storyId, token }) {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          mock.dataTags = mock.dataTags.map((t) => {
            if (tag.id === t.id) return tag;
            return t;
          });
          resolve(resolve(tag));
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(
      `${API_URL}/application/stories/${storyId}/videos/tag`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tag),
      }
    );

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async updateTagStatus({ tag, storyId, token }) {
    // -----------
    if (MOCKUP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          mock.dataTags = mock.dataTags.map((t) => {
            if (tag.id === t.id) return tag;
            return t;
          });
          resolve(resolve(tag));
        }, 1000);
      });
    }
    // -----------

    const response = await fetch(
      `${API_URL}/application/stories/${storyId}/videos/tag`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tag),
      }
    );

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  // * TAGS X VIDEOS----------

  async addTagToVideo({ tagId, videoId, storyId, token }) {
    const response = await fetch(
      `${API_URL}/application/stories/${storyId}/videos/${videoId}/tags/${tagId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async removeTagFromVideo({ tagId, videoId, storyId, token }) {
    const response = await fetch(
      `${API_URL}/application/stories/${storyId}/videos/${videoId}/tags/${tagId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },
};
