import mock from 'src/mockData';
import { API_URL } from '../../config/config.js';

export const api = {
  async getCollection(storyId) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(resolve(mock.dataContexts));
      }, 1000);
    });
  },
};
