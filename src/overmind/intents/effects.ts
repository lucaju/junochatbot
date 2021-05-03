import mock from '@src/../test/mockData';
import { API_URL } from '@src/config/config';
import type { Entity, ErrorMessage, Intent } from '@src/types';

const MOCK_UP = true;

export const api = {
  getIntents: async (
    storyId: number,
    token: string
  ): Promise<Intent[] | ErrorMessage> => {
    if (MOCK_UP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(mock.dataIntents);
        }, 1000);
      });
    }

    const response = await fetch(`${API_URL}/stories/${storyId}/intents/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    if (response.status === 204) return [] as Intent[];

    const result = await response.json();
    return result as Intent[];
  },

  getIntent: async (
    storyId: number,
    intentName: string,
    token: string
  ): Promise<Intent | ErrorMessage> => {
    if (MOCK_UP) {
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          const intent = mock.dataIntents.find((itt) => itt.name === intentName);
          if (intent) resolve(intent);;
        }, 1000);
      });
    }

    const response = await fetch(
      `${API_URL}/stories/${storyId}/intents/${intentName}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) return { errorMessage: response.statusText };

    if (response.status === 204) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Intent;
  },

  createIntent: async (
    storyId: number,
    intent: Intent,
    token: string
  ): Promise<Intent | ErrorMessage> => {
    if (MOCK_UP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          mock.dataIntents = [intent, ...mock.dataIntents];
          resolve(intent);
        }, 1000);
      });
    }

    const response = await fetch(`${API_URL}/stories/${storyId}/intents`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(intent),
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Intent;
  },

  updateIntent: async (
    storyId: number,
    intent: Intent,
    token: string
  ): Promise<Intent | ErrorMessage> => {
    if (MOCK_UP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          mock.dataIntents.map((itt) => {
            if (itt.name === intent.name) return intent;
            return itt;
          });
          resolve(intent);
        }, 1000);
      });
    }

    const response = await fetch(`${API_URL}/stories/${storyId}/intents`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(intent),
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Intent;
  },

  deleteIntent: async (
    storyId: number,
    intentName: string,
    token: string
  ): Promise<boolean | ErrorMessage> => {
    if (MOCK_UP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          mock.dataIntents.filter((itt) => itt.name !== intentName);
          resolve(true);
        }, 1000);
      });
    }

    const response = await fetch(
      `${API_URL}/stories/${storyId}/intents/${intentName}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },

  getEntities: async (token: string): Promise<Entity[] | ErrorMessage> => {
    const response = await fetch(`${API_URL}/intents/entities/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    if (response.status === 204) return [] as Entity[];

    const result = await response.json();
    return result as Entity[];
  },
};
