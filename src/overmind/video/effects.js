import mock from 'src/mockData';

export const api = {
  async getCollection(storyId) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(resolve(mock.dataVideoCollection));
      }, 1000);
    });
  },
  async getVideo({ storyId, videoId }) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        const video = mock.dataVideoCollection.find(
          (video) => video.id === videoId
        );
        resolve(resolve(video));
      }, 1000);
    });
  },
  async createVideo({ storyId, video }) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        video.id = 100;
        mock.dataVideoCollection.unshift(video);
        resolve(resolve(video));
      }, 1000);
    });
  },
  async updateVideo({ storyId, video }) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        mock.dataVideoCollection = mock.dataVideoCollection.map((v) => {
          if (video.id === v.id) return video;
          return v;
        });
        resolve(resolve(video));
      }, 1000);
    });
  },
  async deleteVideo({ storyId, videoId }) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        mock.dataVideoCollection = mock.dataVideoCollection.filter(
          (video) => video.id !== videoId
        );
        resolve(resolve(videoId));
      }, 1000);
    });
  },
};
