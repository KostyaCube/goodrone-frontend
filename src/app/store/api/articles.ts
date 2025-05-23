import { ArticleResponse, IArticle } from '@src/shared/types';
import { baseApi } from './APIbase';
import { URLs } from '@src/shared/constants';

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<ArticleResponse, FormData>({
      query: (body) => {
        return {
          url: URLs.ARTICLES,
          method: 'post',
          body
        };
      },
      invalidatesTags: [{ type: 'Articles' }, { type: 'Words' }]
    }),

    editPost: builder.mutation<void, { id: string; formData: FormData }>({
      query: (body) => {
        return {
          url: `${URLs.ARTICLES}/${body.id}`,
          method: 'put',
          body: body.formData
        };
      },
      invalidatesTags: [{ type: 'Articles' }, { type: 'Words' }]
    }),

    deletePost: builder.mutation<void, number | string>({
      query: (id) => {
        return {
          url: `${URLs.ARTICLES}/${id}`,
          method: 'delete'
        };
      },
      invalidatesTags: [{ type: 'Articles' }]
    }),

    getPosts: builder.query<IArticle[], { lang: string; skip?: string; userID?: string; order?: string; saved?: string }>({
      query: (params = { lang: 'en' }) => {
        const queryParams = new URLSearchParams();

        if (params.saved) {
          queryParams.append('saved', params.saved);
        }
        if (params.lang) {
          queryParams.append('lang', params.lang);
        }
        if (params.skip) {
          queryParams.append('skip', params.skip);
        }
        if (params.userID) {
          queryParams.append('userID', params.userID);
        }
        if (params.order) {
          queryParams.append('order', params.order);
        }
        const queryString = queryParams.toString();
        return `${URLs.ARTICLES}${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: [{ type: 'Articles' }]
    }),

    getOnePost: builder.query<IArticle, string | undefined>({
      query: (id) => {
        return `${URLs.ARTICLES}/${id}`;
      },
      providesTags: [{ type: 'Articles' }]
    }),

    getUserPostsLength: builder.query<number, string | undefined>({
      query: (id) => {
        return `${URLs.ARTICLES_LENGTH}/${id}`;
      }
    }),

    postView: builder.mutation<void, string | undefined>({
      query: (id) => {
        return {
          url: `${URLs.ARTICLES_MAKE_VIEWED}/${id}`,
          method: 'get'
        };
      },
      invalidatesTags: [{ type: 'Articles' }]
    }),

    postLike: builder.mutation<void, { userId: number; articleId: number }>({
      query: (body) => {
        return {
          url: URLs.ARTICLES_LIKE,
          method: 'post',
          body
        };
      },
      invalidatesTags: [{ type: 'Articles' }, { type: 'User' }]
    }),

    savePostToFav: builder.mutation<void, { userID: number; articleId: number }>({
      query: (params) => {
        return {
          url: `${URLs.ARTICLES_FAVORITES}/${params.userID}/${params.articleId}`,
          method: 'post'
        };
      },
      invalidatesTags: [{ type: 'User' }]
    }),

    removePostFromFav: builder.mutation<void, { userID: number; articleId: number }>({
      query: (params) => {
        return {
          url: `${URLs.ARTICLES_FAVORITES}/${params.userID}/${params.articleId}`,
          method: 'delete'
        };
      },
      invalidatesTags: [{ type: 'Articles' }, { type: 'User' }]
    })
  })
});

export const {
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useGetOnePostQuery,
  useGetUserPostsLengthQuery,
  usePostViewMutation,
  usePostLikeMutation,
  useSavePostToFavMutation,
  useRemovePostFromFavMutation
} = articlesApi;
