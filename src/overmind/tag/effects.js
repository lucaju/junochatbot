import mock from 'src/mockData';

export const api = {
  async getTags(storyId) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(resolve(mock.dataTags));
      }, 1000);
    });
  },

  async getTag({ storyId, tagId }) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        const tag = mock.dataTags.find((tag) => tag.id === tagId);
        resolve(resolve(tag));
      }, 1000);
    });
  },

  async createTag({ storyId, tag }) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        tag.id = mock.dataTags.length + 1;
        mock.dataTags.unshift(tag);
        resolve(resolve(tag));
      }, 1000);
    });
  },

  async updateTag({ storyId, tag }) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        mock.dataTags = mock.dataTags.map((t) => {
          if (tag.id === t.id) return tag;
          return t;
        });
        resolve(resolve(tag));
      }, 1000);
    });
  },

  async deleteTag({ storyId, tagId }) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        mock.dataTags = mock.dataTags.filter((tag) => tag.id !== tagId);
        resolve(resolve(tagId));
      }, 1000);
    });
  },
};
