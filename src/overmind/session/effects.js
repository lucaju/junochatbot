// import mock from 'src/mockData';
import base64 from 'base-64';
import { API_URL } from '../../../config/config.js';

export const api = {
  authenticateWithCredentials: async ({ email, password }) => {
    const headers = new Headers();
    const credentials = base64.encode(`${email}:${password}`);
    headers.append('Authorization', `Basic ${credentials}`);

    //access endpoint
    const response = await fetch(`${API_URL}/authentication/login`, {
      method: 'POST',
      headers,
    });

    const { status, statusText } = response;
    if (status !== 200) {
      return { error: { status, statusText } };
    }

    const result = await response.json();
    return result;
  },

  getUserDetails: async (token) => {
    const response = await fetch(`${API_URL}/application/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { status, statusText } = response;
    if (status !== 200) {
      return { error: { status, statusText } };
    }

    const result = await response.json();
    return result;
  },
};
