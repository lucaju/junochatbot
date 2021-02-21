// import mock from 'src/mockData';
import base64 from 'base-64';
import { API_URL } from '../../config/config.js';

export const api = {
  authenticate: async ({ email, password }) => {
    const headers = new Headers();
    const credentials = base64.encode(`${email}:${password}`);
    headers.append('Authorization', `Basic ${credentials}`);

    //access endpoint
    const response = await fetch(`${API_URL}/authentication/login`, {
      method: 'POST',
      headers,
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  getUserDetails: async (token) => {
    const response = await fetch(`${API_URL}/application/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  getUserGroups: async (token) => {
    const response = await fetch(`${API_URL}/application/groups`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async changePassword(password, token) {
    const response = await fetch(`${API_URL}/application/users/changepassword`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(password),
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async uploadAvatar(avatar, { token }) {
    const formData = new FormData();
    formData.append('file', avatar);

    const response = await fetch(`${API_URL}/application/users/avatar`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    return response;
  },

  async deleteAvatar({ token }) {
    const response = await fetch(`${API_URL}/application/users/avatar`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    return response;
  },
};
