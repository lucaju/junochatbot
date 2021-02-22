import Cookies from 'js-cookie';

export const hasToken = () => getUserToken();
export const getUserToken = () => Cookies.get('JunoToken');

export const signedIn = async ({ state, effects }) => {
  if (state.session.isSignedIn) return true;
  if (!state.session.isSignedIn && hasToken()) {
    const token = getUserToken();
    const response = await getUserDetails({ state, effects }, token);
    return response.error ? false : true;
  }
  return false;
};

export const authenticate = async ({ state, effects }, { email, password }) => {
  const response = await effects.session.api.authenticate({
    email,
    password,
  });

  if (response.error) return response;

  const token = response.token;
  Cookies.set('JunoToken', token);

  const userDetails = await getUserDetails({ state, effects }, token);
  return userDetails;
};

export const getUserDetails = async ({ state, effects }, token) => {
  //details
  const responseDetails = await effects.session.api.getUserDetails(token);
  if (responseDetails.error) {
    signOut({ state });
    return responseDetails;
  }

  const user = { ...responseDetails, token };

  //groups
  const responseGroups = await effects.session.api.getUserGroups(token);
  if (!responseGroups.error) {
    user.groups = responseGroups;
  }

  state.session.user = user;

  return state.session.user;
};

export const changePassword = async ({ state, effects }, password) => {
  const token = state.session.user.token;
  const response = await effects.session.api.changePassword(password, token);
  if (response.error) return { error: response.statusText };
  return response;
};

export const uploadAvatar = async ({ state, effects }, avatar) => {
  const token = state.session.user.token;
  const response = await effects.session.api.uploadAvatar(avatar, token);
  if (response.error) return { error: response.statusText };
  state.session.user.avatarUrl = response.fileName;

  //update user list
  if (state.users.list.length > 0) updateSelfAvatarOnUserList(state);

  return response;
};

export const deleteAvatar = async ({ state, effects }) => {
  const token = state.session.user.token;
  const response = await effects.session.api.deleteAvatar(token);
  if (response.error) return { error: response.statusText };
  state.session.user.avatarUrl = null;

  //update user list
  if (state.users.list.length > 0) updateSelfAvatarOnUserList(state);

  return response;
};

const updateSelfAvatarOnUserList = (state) => {
  const currentUser = state.session.user;
  state.users.list = state.users.list.map((user) => {
    if (user.id === currentUser.id) {
      user.avatarUrl = state.session.user.avatarUrl;
    }
    return user;
  });
};

export const signOut = ({ state }) => {
  Cookies.remove('JunoToken');
  localStorage.clear();
  state.session.user = null;
  state.session.stories = null;
  state.session.story = null;
  return false;
};
