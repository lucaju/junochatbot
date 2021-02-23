import { API_URL } from '../../config/config.js';

export const api = {
  async getAllUsers(token) {
    const response = await fetch(`${API_URL}/admin/users/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async getUsersByGroup(groupId, token) {
    const response = await fetch(`${API_URL}/admin/groups${groupId}/users/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

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

  async getUserGroups(userId, token) {
    const response = await fetch(`${API_URL}/admin/groups/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    return result;
  },

  async createUser(userData, token) {
    const response = await fetch(`${API_URL}/admin/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

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

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async addUserToGroup({ groupId, userId, token }) {
    const response = await fetch(`${API_URL}/admin/groups${groupId}/users${userId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async deleteUserFromGroup({ groupId, userId, token }) {
    console.log( {groupId, userId, token })
    const response = await fetch(`${API_URL}/admin/groups${groupId}/users${userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(response)

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    return response;
  },

  async getGroups(token) {
    const response = await fetch(`${API_URL}/admin/groups/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async createGroup(groupData, token) {
    const response = await fetch(`${API_URL}/admin/groups`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData),
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async updateGroup(groupData, token) {
    const response = await fetch(`${API_URL}/admin/groups`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData),
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async uploadAvatar({ avatar, userId, token }) {
    const formData = new FormData();
    formData.append('file', avatar);

    const response = await fetch(`${API_URL}/admin/users/${userId}/avatar`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    const result = await response.json();
    return result;
  },

  async deleteAvatar(userId, token) {
    const response = await fetch(`${API_URL}/admin/users/${userId}/avatar`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    return response;
  },

  requestPassword: async (email) => {
    const response = await fetch(`${API_URL}/authentication/users/sendresetpassword/${email}`);

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    return response;
  },

  resetPassword: async (password, token) => {
    const response = await fetch(`${API_URL}/authentication/users/setpassword`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    const { ok, status, statusText } = response;
    if (!ok) return { error: { status, statusText } };

    return response;
  },
};
