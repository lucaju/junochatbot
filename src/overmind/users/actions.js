//***** USERS */

export const getUsers = async ({ state, effects }, groupId) => {
  const token = state.session.user.token;
  let list;

  if (groupId) {
    list = await effects.users.api.getUsersByGroup(groupId, token);
  }

  if (!groupId && state.session.isInstructor) {
    groupId = state.session.user.groups[0].id;
    list = await effects.users.api.getUsersByGroup(groupId, token);
  }

  if (!groupId && state.session.isAdmin) {
    list = await effects.users.api.getAllUsers(token);
  }

  state.users.list = sortBy(list, 'firstName');
};

export const getUser = async ({ state, effects }, userId) => {
  const token = state.session.user.token;
  const user = await effects.users.api.getUser(userId, token);
  return user;
};

export const getUserGroups = async ({ state, effects }, userId) => {
  const token = state.session.user.token;
  const user = await effects.users.api.getUserGroups(userId, token);
  return user;
};

export const saveUser = async ({ state, effects }, data) => {
  console.log(data);
  const token = state.session.user.token;

  //Split data
  const userData = {
    userName: data.userName,
    firstName: data.firstName,
    lastName: data.lastName,
    roleTypeId: data.roleTypeId,
    // avatarUrl: data.avatarUrl,
    avatarUrl: 'none',
    active: data.active,
    password: 'password',
  };

  const groupId = data?.groupId;
  // const avatarUrl = data.avatarUrl;

  let user;
  if (userData.id) {
    user = await updateUser({ state, effects }, { userData, token });
  } else {
    user = await createUser({ state, effects }, { userData, token });
  }

  if (user && groupId) {
    await addUserToGroup({ state, effects }, { groupId, userId: user.id });
  }

  return user;
};

const createUser = async ({ state, effects }, { userData, token }) => {
  // Check avatar
  if (userData.avatarUrl?.name || userData.removeAvatar) {
    const avatarApi = await manageAvatar(effects, userData);
    if (avatarApi.error) userData.avatarUrl = '';
    if (avatarApi.filename) userData.avatarUrl = avatarApi.name;
  }

  const response = await effects.users.api.createUser(userData, token);
  if (response.error) return response;

  state.users.list.unshift(response);
  sortBy(state.users.list, 'firstName');

  return response;
};

const updateUser = async ({ state, effects }, { userData, token }) => {
  //Check avatar
  if (userData.avatarUrl.name || userData.removeAvatar) {
    const avatarApi = await manageAvatar(effects, userData);
    if (avatarApi.error) userData.avatarUrl = '';
    if (avatarApi.filename) {
      userData.avatarUrl = avatarApi.filename;
      if (userData.removeAvatar) delete userData.removeAvatar;
    }
  }

  const response = await effects.users.api.updateUser(userData, token);
  if (response.error) return response;

  state.users.list = state.users.list.map((user) => {
    if (user.id === userData.id) user = userData;
    return user;
  });

  return response;
};

export const addUserToGroup = async (
  { state, effects },
  { groupId, userId }
) => {
  const token = state.session.user.token;

  const response = await effects.users.api.addUserToGroup({
    groupId,
    userId,
    token,
  });

  if (response.error) return response;

  const result = await response.json();
  return result;
};

//***** GROUPS */

export const getGroups = async ({ state, effects }) => {
  const token = state.session.user.token;
  let groups = await effects.users.api.getGroups(token);

  groups = sortBy(groups, 'name');
  state.users.groups = groups;

  return state.users.groups;
};

export const saveGroup = async ({ state, effects }, groupData) => {
  const token = state.session.user.token;
  if (groupData.id) {
    return await updateGroup({ state, effects, groupData, token });
  } else {
    return await createGroup({ state, effects, groupData, token });
  }
};

const createGroup = async ({ state, effects, groupData, token }) => {
  const response = await effects.users.api.createGroup(groupData, token);
  if (response.error) return response;

  state.users.groups.unshift(response);
  sortBy(state.users.groups, 'name');

  return response;
};

const updateGroup = async ({ state, effects, groupData, token }) => {
  const response = await effects.users.api.updateGroup(groupData, token);
  if (response.error) return response;

  state.users.groups = state.users.groups.map((group) => {
    if (group.id === groupData.id) group = groupData;
    return group;
  });

  return response;
};

//***** PASSWORD */

export const requestPassword = async ({ effects }, { email }) => {
  const response = await effects.users.api.requestPassword({ email });
  if (response.error) return response;
  return {};
};

export const resetPassword = async ({ effects }, { password, token }) => {
  const response = await effects.users.api.resetPassword({
    password,
    token,
  });
  if (response.error) return response;
  return {};
};

//***** AVATAR */

const manageAvatar = async (effects, { avatarUrl, removeAvatar }) => {
  let avatarManager;
  if (avatarUrl?.name && removeAvatar) {
    avatarManager = await updateAvatar(effects, { avatarUrl, removeAvatar });
  } else if (avatarUrl?.name) {
    avatarManager = await uploadAvatar(effects, avatarUrl);
  } else if (removeAvatar) {
    avatarManager = await deleteAvatar(effects, removeAvatar);
  }
  return avatarManager;
};

const uploadAvatar = async (effects, avatarUrl) => {
  const uniqueFileName = createUniqueFileName(avatarUrl.type);
  const avatarData = { avatarUrl, uniqueFileName };

  const response = await effects.users.api.uploadAvatar(avatarData);
  if (response.error) return response;

  return {
    filename: uniqueFileName,
  };
};

const updateAvatar = async (effects, { avatarUrl, removeAvatar }) => {
  const uniqueFileName = createUniqueFileName(avatarUrl.type);
  const avatarData = { avatarUrl, removeAvatar, uniqueFileName };

  const response = await effects.users.api.updateAvatar(avatarData);
  if (response.error) return response;

  return {
    filename: uniqueFileName,
  };
};

const deleteAvatar = async (effects, removeAvatar) => {
  const response = await effects.users.api.deleteAvatar(removeAvatar);
  if (response.error) return response;
  return { filename: '' };
};

const createUniqueFileName = (mimeType) => {
  const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const extension = mimeType.split('/')[1];
  return `${uniqueName}.${extension}`;
};

//***** UTIL */

const sortBy = (items, prop) => {
  items.sort((a, b) => {
    const propA = a[prop].toUpperCase(); // ignore upper and lowercase
    const propB = b[prop].toUpperCase(); // ignore upper and lowercase
    if (propA < propB) return -1;
    if (propA > propB) return 1;
    return 0;
  });
  return items;
};
