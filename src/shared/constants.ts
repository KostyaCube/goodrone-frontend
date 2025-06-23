export const API_URL = import.meta.env.VITE_API_BASE_URL;

export const URLs = {
  SIGNUP: 'auth/register',
  SIGNIN: 'auth/login',

  KEYWORDS: 'keywords',
  ARTICLES: 'articles',
  ARTICLES_LIKE: 'user/articles/like',
  ARTICLES_LENGTH: 'articles-length',
  ARTICLES_FAVORITES: 'articles/favorites',
  ARTICLES_MAKE_VIEWED: 'articles/make-viewed',

  COMMENTS: 'comments',
  COMMENTS_LIKE: 'user/comments/like',

  FILE: 'file',
  USER: 'user',
  PROFILE: 'profile',
  SUBSCRIPTION: 'subscriptions/create',
  SUBSCRIPTION_DEL: 'subscriptions',

  QUESTIONS: 'questions',
  QUESTIONS_LIKE: 'user/questions/like',
  QUESTIONS_MAKE_VIEWED: 'questions/make-viewed',
  QUESTIONS_FAVORITES: 'questions/favorites',
  QUESTIONS_SEARCH: 'questions-search',
  QUESTIONS_LENGTH: 'questions-length',

  ANSWERS: 'answers',
  ANSWER_UP: 'answers/up',
  ANSWER_DOWN: 'answers/down'
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

export const supportedImageTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif'];
