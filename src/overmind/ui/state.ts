
import { Language , Notification, NotificationType } from '@src/types';

type State = {
  appName: string;
  pageTitle: string;
  darkMode: boolean;
  languages: Language[];
  notification: Notification;
  languageCode?: string;
};

export const state: State = {
  appName: 'Juno Chatbot',
  pageTitle: 'Juno Chatbot',
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
