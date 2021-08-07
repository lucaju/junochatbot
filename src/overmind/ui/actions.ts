import { NotificationType } from '@src/types';
import { Context } from '../';

export const onInitializeOvermind = ({ state }: Context, overmind: any) => {
  //LANGUAGE
  const prefLanguage = localStorage.getItem('i18nextLng');
  if (prefLanguage) state.ui.languageCode = prefLanguage;

  //DARK MODE
  const prefDarkMode = localStorage.getItem('darkMode');
  const darkMode = prefDarkMode === 'true' ? true : false;
  state.ui.darkMode = darkMode;
};

export const setPageTitle = ({ state }: Context, title: string) => {
  state.ui.pageTitle = title;
};

export const setDarkMode = ({ state }: Context, value: boolean) => {
  state.ui.darkMode = value;
  localStorage.setItem('darkMode', JSON.stringify(value));
};

export const switchLanguage = ({ state }: Context, value: string) => {
  state.ui.languageCode = value;
};

export const isLanguageSupported = ({ state }: Context, value?: string) => {
  if (!value) return false;
  const langSupported = state.ui.languages.some((lang) => lang.value === value);
  return langSupported;
};

export const showNotification = (
  { state }: Context,
  { message, type, open = true }: { message: string; type: NotificationType; open?: boolean }
) => {
  state.ui.notification = { type, message, open };
};

export const closeNotification = ({ state }: Context) => {
  state.ui.notification = {
    open: false,
    type: state.ui.notification.type,
    message: state.ui.notification.message,
  };
};

export const setTagsPanelVisible = ({ state }: Context, value: boolean) => {
  state.ui.videoView.tagsPanelVisible = value;
};

export const setTagFilter = ({ state }: Context, value: number | null) => {
  state.ui.videoView.tagFilter = value;
};

export const resetTagFilter = ({ state }: Context) => {
  state.ui.videoView.tagFilter = null;
};