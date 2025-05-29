export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  activity: string | null;

  likedArticles: number[];
  likedComments: number[];
  savedPosts: IArticle[];

  subscribers: ISubscription[];
  subscriptions: ISubscription[];
}

export interface UserState {
  user: User | null;
  token: string;
}

export type ISignin = {
  email: string;
  password: string;
  remember?: boolean;
};

export type ISignup = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export interface IKeyword {
  id: number;
  body: string;
  questionId: null;
}

export interface IFile {
  id: number;
  link: string;
  created_at: string;
}

export interface IArticle {
  id: number;
  lang: string;
  title: string;
  body: string;
  views: number;
  rating: number;
  authorId: number;
  comments: IComment[];
  files: IFile[];
  created_at: string;
  author: User;
  keywords: IKeyword[];
}

export interface IComment {
  id: number;
  body: string;
  postId: number;
  rating: number;
  authorId: number;
  replyOn?: IComment;
  created_at: string;
  author: User;
}

export interface ArticleResponse {
  id: number;
  title: string;
  body: string;
  created_at: Date;
  views: number;
  rating: number;
  authorId: number;
  lang: string;
}

export interface ISubscription {
  id: number;
  subscriberId: number;
  subscribedToId: number;
  subscriber?: User;
  subscribedTo?: User;
}
