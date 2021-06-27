import type { Credential, ErrorMessage, User } from '@src/types';
import { isError } from '@src/util/utilities';
import Cookies from 'js-cookie';
import { Context } from '../';

export const getUserToken = (): string | undefined => Cookies.get('JunoToken');

export const signedIn = async ({ state, actions }: Context): Promise<boolean> => {
  if (state.session.isSignedIn) return true;

  const token = getUserToken();
  if (!token) return false;

  const userDetails = await actions.session.getUserDetails(token);
  if (isError(userDetails)) return false;

  state.session.user = userDetails;
  return true;
};

export const authenticate = async (
  { state, effects, actions }: Context,
  credential?: Credential
): Promise<User | ErrorMessage> => {
  let token = getUserToken();

  if (credential) {
    const response = await effects.session.api.authenticate(credential);
    if (isError(response)) return response;

    token = response.token;
    Cookies.set('JunoToken', token);
  }

  if (!token) return { errorMessage: '' };

  const userDetails = await actions.session.getUserDetails(token);
  if (isError(userDetails)) {
    actions.session.signOut();
    return userDetails;
  }

  state.session.user = userDetails;
  return userDetails;
};

export const getUserDetails = async (
  { effects }: Context,
  token: string
): Promise<User | ErrorMessage> => {
  const responseDetails = await effects.session.api.getUserDetails(token);
  if (isError(responseDetails)) return responseDetails;

  const user = { ...responseDetails, token };

  //groups
  const responseGroup = await effects.users.api.getUserGroup(responseDetails.id, token);

  if (responseGroup && !isError(responseGroup)) {
    user.groupId = responseGroup.id;
  }

  return user;
};

export const changePassword = async (
  { state, effects }: Context,
  password: string
): Promise<boolean | ErrorMessage> => {
  const user = state.session.user;
  if (!user || !user.token) return { errorMessage: 'Not authorized' };

  const response = await effects.session.api.changePassword(user.id, password, user.token);
  if (isError(response)) return response;

  return true;
};

export const uploadAvatar = async (
  { state, effects, actions }: Context,
  avatar: string
): Promise<boolean | ErrorMessage> => {
  const user = state.session.user;
  if (!user || !user.token) return { errorMessage: 'Not authorized' };

  const response = await effects.session.api.uploadAvatar(user.id, avatar, user.token);
  if (isError(response)) return response;

  user.avatarUrl = response.fileName;
  if (state.users.list.length > 0) actions.session.updateSelfAvatarOnUserList();

  return true;
};

export const deleteAvatar = async ({
  state,
  effects,
  actions,
}: Context): Promise<boolean | ErrorMessage> => {
  const user = state.session.user;
  if (!user || !user.token) return { errorMessage: 'Not authorized' };

  const response = await effects.session.api.deleteAvatar(user.id, user.token);
  if (isError(response)) return response;

  user.avatarUrl = undefined;
  if (state.users.list.length > 0) actions.session.updateSelfAvatarOnUserList();

  return true;
};

export const updateSelfAvatarOnUserList = ({ state }: Context) => {
  const currentUser = state.session.user;
  if (!currentUser) return;

  state.users.list = state.users.list.map((user: User) => {
    if (user.id === currentUser.id) {
      user.avatarUrl = currentUser.avatarUrl;
    }
    return user;
  });
};

export const signOut = ({ state }: Context) => {
  Cookies.remove('JunoToken');
  localStorage.clear();
  state.session.user = null;
  state.session.stories = null;
  state.session.story = null;
};
