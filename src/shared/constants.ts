export const API_URL = import.meta.env.VITE_API_BASE_URL;

export const URLs = {
  SIGNUP: 'auth/register',
  SIGNIN: 'auth/login'
};

export const languages = [
  {
    id: '1',
    value: 'English',
    code: 'en'
  },
  {
    id: '2',
    value: 'Русский',
    code: 'ru'
  }
];

const langFromLocalStorage = localStorage.getItem('lang');
export const parsedLang = langFromLocalStorage ? JSON.parse(langFromLocalStorage) : null;
export const defaultLang = languages.find((item) => item.id === parsedLang)?.id || languages[0].id;
