import mock from 'src/mockData';
import { API_URL } from '../../config/config.js';


export const api = {
  async getCollection(storyId) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(resolve(mock.dataScreenplay));
      }, 1000);
    });
  },
  async getIntent({ storyId, intentId }) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        const intent = mock.dataScreenplay.find(
          (intent) => intent.id === intentId
        );
        resolve(resolve(intent));
      }, 1000);
    });
  },
  async createIntent({ storyId, intent }) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        intent.id = 100;
        mock.dataScreenplay.unshift(intent);
        resolve(resolve(intent));
      }, 1000);
    });
  },
  async updateIntent({ storyId, intent }) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        mock.dataScreenplay = mock.dataScreenplay.map((itt) => {
          if (intent.id === itt.id) return intent;
          return itt;
        });
        resolve(resolve(intent));
      }, 1000);
    });
  },
  async deleteIntent({ storyId, intentId }) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        mock.dataScreenplay = mock.dataScreenplay.filter(
          (intent) => intent.id !== intentId
        );
        resolve(resolve(intentId));
      }, 1000);
    });
  },
};
