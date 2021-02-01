// import mock from 'src/mockData';
import base64 from 'base-64';

const baseURL = 'https://api.junochatbot.ca';

export const api = {
  authenticateWithCredentials: async ({ email, password }) => {
    const headers = new Headers();
    const credentials = base64.encode(`${email}:${password}`);
    headers.append('Authorization', `Basic ${credentials}`);

    //access endpoint
    const response = await fetch(`${baseURL}/authentication/login`, {
      method: 'POST',
      headers,
    });

    if (response.status !== 200) {
      return {
        error: {
          status: response.status,
          statusText: response.statusText,
        },
      };
    }

    const result = await response.json();
    return result;
  },

  getUserDetails: async (token) => {
    const response = await fetch(`${baseURL}/student/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status !== 200) {
      return {
        error: {
          status: response.status,
          statusText: response.statusText,
        },
      };
    }

    const result = await response.json();
    return result;
  },
};
