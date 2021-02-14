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
  const response = await effects.session.api.getUserDetails(token);
  if (response.error) return response;
  state.session.user = { ...response, token };
  return state.session.user;
};

export const signOut = ({ state }) => {
  Cookies.remove('JunoToken');
  Cookies.remove('JunoDarkMode');
  state.session.user = null;
  state.session.stories = null;
  state.session.story = null;
  return false;
};
