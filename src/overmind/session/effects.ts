import base64 from 'base-64';
import { API_URL } from '../../config/config.js';
import type { Credential, ErrorMessage, User, UserGroup } from '../../types';

type ResponseToken = {
  token: string;
};

type ResponseUploadAvatar = {
  fileName: string;
};

export const api = {
  authenticate: async ({
    email,
    password,
  }: Credential): Promise<ResponseToken | ErrorMessage> => {
    const headers = new Headers();
    const credentials = base64.encode(`${email}:${password}`);
    headers.append('Authorization', `Basic ${credentials}`);

    //access endpoint
    const response = await fetch(`${API_URL}/authentication/login`, {
      method: 'POST',
      headers,
    });

    if (!response.ok) {
      const errorMessage =
        response.statusText !== ''
          ? response.statusText
          : 'Sorry, we do not recognize this account.';
      return { errorMessage };
    }

    const result = await response.json();
    return result as ResponseToken;
  },

  getUserDetails: async (token: string): Promise<User | ErrorMessage> => {
    const response = await fetch(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as User;
  },

  changePassword: async (
    userId: number,
    password: string,
    token: string
  ): Promise<boolean | ErrorMessage> => {
    const response = await fetch(`${API_URL}/users/${userId}/password`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },

  uploadAvatar: async (
    userId: number,
    avatar: string,
    token: string
  ): Promise<ResponseUploadAvatar | ErrorMessage> => {
    const formData = new FormData();
    formData.append('file', avatar);

    const response = await fetch(`${API_URL}/users/${userId}/avatar`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) return { errorMessage: response.statusText };

    const result = await response.json();
    return result as ResponseUploadAvatar;
  },

  deleteAvatar: async (
    userId: number,
    token: string
  ): Promise<boolean | ErrorMessage> => {
    const response = await fetch(`${API_URL}/users/${userId}/avatar`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return { errorMessage: response.statusText };

    return true;
  },
};
