import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { en, fr } from './locales';

const options = {
  interpolation: { escapeValue: false /* not needed for react!! */ },
  resources: { en, fr },
  // lng: 'en-CA',
  // fallbackLng: 'en-CA',
  ns: ['common'],
  defaultNS: 'common',
  // debug: true,
  react: {
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default',
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(options);

export default i18n;
