export const languages = [
  {
    id: '1b174688-8529-440a-ac9a-76552011b818',
    value: 'English',
    code: 'en'
  },
  {
    id: '4d3af8fe-5eab-4c3f-ae1b-dd7642c288cb',
    value: 'Русский',
    code: 'ru'
  }
];

const langFromLocalStorage = localStorage.getItem('lang');
export const parsedLang = langFromLocalStorage ? JSON.parse(langFromLocalStorage) : null;
export const defaultLang = languages.find((item) => item.id === parsedLang)?.id || languages[0].id;
