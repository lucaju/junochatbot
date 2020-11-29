import Cookies from 'js-cookie';

export const hasToken = () => getUserToken();

export const getUserToken = () => {
  const token = Cookies.get('chatStoriesToken');
  return token;
};

export const signedIn = async ({ state, actions }) => {
  if (state.session.isSignedIn) return true;
  if (!state.session.isSignedIn && hasToken()) {
    const token = getUserToken();
    const user = await actions.session.authenticate({ token });
    if (user) return true;
  }
  return false;
};

export const authenticate = async (
  { state, effects },
  { email = null, password = null, token = null }
) => {
  let res;
  if (token) {
    res = await effects.session.api.authenticateWithToken(token);
  } else {
    res = await effects.session.api.authenticateWithCredentials({
      email,
      password,
    });
    Cookies.set('chatStoriesToken', res.user.token);
  }
  if (res.error) return res;
  state.session.user = res.user;
  return res.user;
};

export const signOut = ({ state }) => {
  Cookies.remove('chatStoriesToken');
  Cookies.remove('chatStoriesDarkMode');
  state.session.user = null;
  state.session.stories = null;
  state.session.story = null;
  return false;
};
