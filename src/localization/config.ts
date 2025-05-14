import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLang as defLang } from '@src/shared/constants';
import en from './translations/en.json';
// import ru from './translations/ru.json';

export const resources = {
  en: {
    translation: en
  }
  // ru: {
  //   translation: ru,
  // },
};

let defaultLang = defLang;

switch (defaultLang) {
  case '1b174688-8529-440a-ac9a-76552011b818':
    defaultLang = 'en';
    break;
  case '4d3af8fe-5eab-4c3f-ae1b-dd7642c288cb':
    defaultLang = 'ru';
    break;
  default:
    defaultLang = 'en';
    break;
}

i18n.use(initReactI18next).init({
  lng: defaultLang,
  interpolation: {
    escapeValue: false
  },
  resources,
  react: { useSuspense: false }
});

export default i18n;
