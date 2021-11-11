import mock from '@src/../test/mockData';
import { API_URL } from '@src/config/config';
import type {
  DetectIntentResponse,
  ErrorMessage as IError,
  RequestDetectIntent,
  Story,
  Video,
} from '@src/types';

const MOCK_UP = false; //true;

export const api = {
  getStories: async (): Promise<Story[] | IError> => {
    if (MOCK_UP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(mock.dataStories);
        }, 1000);
      });
    }

    const response = await fetch(`${API_URL}/chats/stories/all`);
    if (!response.ok) return { errorMessage: response.statusText };
    if (response.status === 204) return [] as Story[];

    const result = await response.json();
    return result as Story[];
  },

  getStory: async (storyId: number): Promise<Story | IError> => {
    if (MOCK_UP) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(mock.dataStories[0]);
        }, 1000);
      });
    }

    const response = await fetch(`${API_URL}/chats/stories/${storyId}`);
    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Story;
  },

  detectIntent: async (request: RequestDetectIntent): Promise<DetectIntentResponse | IError> => {
    const {
      analyzeQueryTextSentiment = true,
      resetContexts = false,
      sessionid,
      storyId,
      text,
      token,
    } = request;

    const body: Partial<RequestDetectIntent> = { analyzeQueryTextSentiment, resetContexts, text };
    if (sessionid) body.sessionid = sessionid;

    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    if (token) headers.set('Authorization', `Bearer ${token}`);

    const response = await fetch(`${API_URL}/chats/stories/${storyId}/intents/detect`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as DetectIntentResponse;
  },

  getVideo: async (storyId: number, viedoId: number, token?: string): Promise<Video | IError> => {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    if (token) headers.set('Authorization', `Bearer ${token}`);

    const response = await fetch(`${API_URL}/chats/stories/${storyId}/videos/${viedoId}`, {
      headers,
    });
    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Video;
  },

  getVideosBytag: async (
    storyId: number,
    tagId: number,
    token?: string
  ): Promise<Video[] | IError> => {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    if (token) headers.set('Authorization', `Bearer ${token}`);

    const response = await fetch(`${API_URL}/chats/stories/${storyId}/tags/${tagId}/videos/all`, {
      headers,
    });
    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as Video[];
  },
};
