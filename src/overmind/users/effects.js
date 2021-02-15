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

  async uploadAvatar({ avatarUrl, uniqueFileName }) {
    const formData = new FormData();
    formData.append('uniqueFileName', uniqueFileName);
    formData.append('avatar', avatarUrl);

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

  async updateAvatar({ avatarUrl, removeAvatar, uniqueFileName }) {
    const formData = new FormData();
    formData.append('uniqueFileName', uniqueFileName);
    formData.append('avatar', avatarUrl);
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

  requestPassword: async ({ email }) => {
    const response = await fetch(
      `${API_URL}/authentication/users/sendresetpassword/${email}`
    );

    const { status, statusText } = response;
    if (status !== 200) {
      return { error: { status, statusText } };
    }

    return response;
  },

  resetPassword: async ({ password, token }) => {
    const response = await fetch(
      `${API_URL}/authentication/users/setpassword`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      }
    );

    const { status, statusText } = response;
    if (status !== 200) {
      return { error: { status, statusText } };
    }

    return response;
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
