import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { en, fr } from './locales';

const resources = { en, fr } as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // debug: true,
    defaultNS: 'common',
    // fallbackLng: 'en-CA',
    interpolation: { escapeValue: false /* not needed for react!! */ },
    // lng: 'en-CA',
    ns: ['common'],
    resources,
  });

export default i18n;
