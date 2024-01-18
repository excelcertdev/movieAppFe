import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import esES from './locales/en-ES/translation.json';

const resources = {
  'en-US': {
    translation: en,
  },
  'es-ES': {
    translation: esES,
  },
};

const userLanguage = navigator.language; // Get the user's browser language

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: resources[userLanguage] ? userLanguage : 'en-US', // Set language based on the user's browser language or default to 'en-US'
    fallbackLng: 'en-US', // language if the user's language is not supported
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
