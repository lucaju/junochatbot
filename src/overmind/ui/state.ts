
import { Language , Notification, NotificationType } from '../../types';

type State = {
  title: string;
  darkMode: boolean;
  languages: Language[];
  notification: Notification;
  languageCode?: string;
};

export const state: State = {
  title: 'Juno Chatbot',
  darkMode: false,
  languages: [
    { value: 'en-CA', name: 'english' },
    { value: 'fr-CA', name: 'french' },
  ],
  notification: {
    open: false,
    type: NotificationType.INFO,
    message: '',
  },
};
