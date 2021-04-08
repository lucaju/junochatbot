import { TrainRounded } from '@material-ui/icons';
import { Context } from 'overmind';
import { Language, Notification, NotificationType } from '../../types';

export const updateTitle = ({ state }: Context, title: string) => {
  state.ui.title = title;
};

export const setDarkMode = ({ state }: Context, value: boolean) => {
  state.ui.darkMode = value;
  localStorage.setItem('darkMode', JSON.stringify(value));
};

export const switchLanguage = ({ state }: Context, value: string) => {
  state.ui.languageCode = value;
};

export const showNotification = (
  { state }: Context,
  { message, type, open = true }: { message:string, type:NotificationType, open?:boolean }
) => {
  state.ui.notification = { type, message, open };
};

export const closeNotification = ({ state }: Context) => {
  state.ui.notification = {
    open: false,
    type: state.ui.notification.type,
    message: state.ui.notification.message
  };
};
