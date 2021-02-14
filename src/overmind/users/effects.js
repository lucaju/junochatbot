// import mock from 'src/mockData';
import { API_URL } from '../../../config/config.js';

export const api = {
  async getUsers(token) {
    const response = await fetch(`${API_URL}/admin/users/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    return result;
  },

  async getUser(userId, token) {
    const response = await fetch(`${API_URL}/admin/users/id/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    return result;
  },

  async addUser(userData, token) {
    const response = await fetch(`${API_URL}/admin/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const { status, statusText } = response;
    if (status !== 200) {
      return { error: { status, statusText } };
    }

    const result = await response.json();
    return result;
  },

  async updateUser(userData, token) {
    const response = await fetch(`${API_URL}/admin/users`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const { status, statusText } = response;
    if (status !== 200) {
      return { error: { status, statusText } };
    }

    const result = await response.json();
    return result;
  },

  async uploadAvatar({ avatar, uniqueFileName }) {
    const formData = new FormData();
    formData.append('uniqueFileName', uniqueFileName);
    formData.append('avatar', avatar);

    const response = await fetch('/user/avatar', {
      method: 'POST',
      body: formData,
    });

    const { status, statusText } = response;
    if (status !== 200) {
      return { error: { status, statusText } };
    }

    return true;
  },

  async updateAvatar({ avatar, removeAvatar, uniqueFileName }) {
    const formData = new FormData();
    formData.append('uniqueFileName', uniqueFileName);
    formData.append('avatar', avatar);
    formData.append('removeAvatar', removeAvatar);

    const response = await fetch('/user/avatar', {
      method: 'PUT',
      body: formData,
    });

    const { status, statusText } = response;
    if (status !== 200) {
      return { error: { status, statusText } };
    }

    return true;
  },

  async deleteAvatar(removeAvatar) {
    const response = await fetch('/user/avatar', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ removeAvatar }),
    });

    const { status, statusText } = response;
    if (status !== 200) {
      return { error: { status, statusText } };
    }

    return true;
  },

  forgotPassword: async ({email}) => {
    // const headers = new Headers();
    // const credentials = base64.encode(`${email}:${password}`);
    // headers.append('Authorization', `Basic ${credentials}`);

    // //access endpoint
    // const response = await fetch(`${API_URL}/authentication/forgotpassword`, {
    //   method: 'POST',
    //   headers,
    // });

    // const { status, statusText } = response;
    // if (status !== 200) {
    //   return { error: { status, statusText } };
    // }

    // const result = await response.json();
    // return result;
    //mock
    return {
      firstName: 'Luciano',
      lastName: 'Frizzera',
      email,
      token: 'Token 12345',
    };
  },

  resetPassword: async ({ password, resetToken }) => {
    // const headers = new Headers();
    // const credentials = base64.encode(`${email}:${password}`);
    // headers.append('Authorization', `Basic ${credentials}`);

    // //access endpoint
    // const response = await fetch(`${API_URL}/authentication/forgotpassword`, {
    //   method: 'POST',
    //   headers,
    // });

    // const { status, statusText } = response;
    // if (status !== 200) {
    //   return { error: { status, statusText } };
    // }

    // const result = await response.json();
    // return result;
    return {};
  },

  async emailNotification(notification) {
    const response = await fetch('/user/emailnotification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notification }),
    });

    const { status, statusText } = response;
    if (status !== 200) {
      return { error: { status, statusText } };
    }

    return response;
  },
};
