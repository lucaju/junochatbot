import mock from 'src/mockData';

export const api = {
  async getCollection(storyId) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(resolve(mock.dataContexts));
      }, 1000);
    });
  },
};
