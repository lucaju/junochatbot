export const getUsers = async ({ state, effects }) => {
  const token = state.session.user.token;
  const list = await effects.users.api.getUsers(token);
  state.users.list = sortBy(list, 'firstName');
};

export const getUser = async ({ state, effects }, userId) => {
  const token = state.session.user.token;
  const user = await effects.users.api.getUser(userId, token);
  return user;
};

export const save = async ({ state, effects }, userData) => {
  const token = state.session.user.token;
  if (userData.id) {
    return await updateUser({ state, effects, userData, token });
  } else {
    return await createUser({ state, effects, userData, token });
  }
};

//***** USERS */

const createUser = async ({ state, effects, userData, token }) => {
  // Check avatar
  if (userData.avatarUrl?.name || userData.removeAvatar) {
    const avatarApi = await manageAvatar(effects, userData);
    if (avatarApi.error) userData.avatarUrl = '';
    if (avatarApi.filename) userData.avatarUrl = avatarApi.name;
  }

  const response = await effects.users.api.addUser(userData, token);
  if (response.error) return response;

  // userData.id = response.id;
  state.users.list.unshift(response);
  sortBy(state.users.list, 'firstName');

  return response;
};

const updateUser = async ({ state, effects, userData, token }) => {
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
