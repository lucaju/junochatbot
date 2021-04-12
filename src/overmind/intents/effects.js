import mock from '../../../test/mockData';
import { API_URL } from '../../config/config';


export const api = {
  async getIntents({ storyId, token }) {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(resolve(mock.intents));
      }, 1000);
    });
  },
  async getIntent({ intentId, storyId, token }) {
    return await new Promise((resolve) => {
      setTimeout(() => {
        const intent = mock.intents.find(
          (intent) => intent.id === intentId
        );
        resolve(resolve(intent));
      }, 1000);
    });
  },
  async createIntent({ intent, storyId, token }) {
    return await new Promise((resolve) => {
      setTimeout(() => {
        intent.id = 100;
        mock.intents.unshift(intent);
        resolve(resolve(intent));
      }, 1000);
    });
  },
  async updateIntent({ intent, storyId, token }) {
    return await new Promise((resolve) => {
      setTimeout(() => {
        mock.intents = mock.intents.map((itt) => {
          if (intent.id === itt.id) return intent;
          return itt;
        });
        resolve(resolve(intent));
      }, 1000);
    });
  },
  async deleteIntent({ intentId, storyId, token }) {
    return await new Promise((resolve) => {
      setTimeout(() => {
        mock.intents = mock.intents.filter(
          (intent) => intent.id !== intentId
        );
        resolve(resolve(intentId));
      }, 1000);
    });
  },
};
