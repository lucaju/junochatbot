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

const createUser = async ({ state, effects, userData, token }) => {
  const response = await effects.users.api.addUser(userData, token);
  if (response.error) return response;

  // userData.id = response.id;
  state.users.list.unshift(response);
  sortBy(state.users.list, 'firstName');

  return response;
};

const updateUser = async ({ state, effects, userData, token }) => {
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
