import { ArticleResponse, IArticle } from '@src/shared/types';
import { baseApi } from './APIbase';
import { URLs } from '@src/shared/constants';

const articlesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<ArticleResponse, FormData>({
      query: (body) => {
        return {
          url: URLs.ARTICLES,
          method: 'post',
          body
        };
      },
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, { type: 'Words' }]
    }),

    editPost: builder.mutation<void, { id: string; formData: FormData }>({
      query: (body) => {
        return {
          url: `${URLs.ARTICLES}/${body.id}`,
          method: 'put',
          body: body.formData
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Articles', id: arg.id }, { type: 'Words' }]
    }),

    deletePost: builder.mutation<void, number | string>({
      query: (id) => {
        return {
          url: `${URLs.ARTICLES}/${id}`,
          method: 'delete'
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: 'Articles', id },
        { type: 'Articles', id: 'LIST' }
      ]
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
      providesTags: (result) =>
        result
          ? [{ type: 'Articles' as const, id: 'LIST' }, ...result.map((post) => ({ type: 'Articles' as const, id: post.id }))]
          : [{ type: 'Articles' as const, id: 'LIST' }]
    }),

    getOnePost: builder.query<IArticle, string | undefined>({
      query: (id) => {
        return `${URLs.ARTICLES}/${id}`;
      },
      providesTags: (result, error, id) => [{ type: 'Articles', id }]
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
      invalidatesTags: (result, error, id) => [{ type: 'Articles', id }]
    }),

    postLike: builder.mutation<void, { articleId: number }>({
      query: (body) => {
        return {
          url: `${URLs.ARTICLES_LIKE}/${body.articleId}`,
          method: 'post'
        };
      },
      invalidatesTags: (result, error, { articleId }) => [
        { type: 'Articles', id: articleId },
        { type: 'User', id: 'ME' }
      ]
    }),

    savePostToFav: builder.mutation<void, { articleId: number }>({
      query: (params) => {
        return {
          url: `${URLs.ARTICLES_FAVORITES}/${params.articleId}`,
          method: 'post'
        };
      },
      invalidatesTags: [{ type: 'User', id: 'ME' }]
    }),

    removePostFromFav: builder.mutation<void, { articleId: number }>({
      query: (params) => {
        return {
          url: `${URLs.ARTICLES_FAVORITES}/${params.articleId}`,
          method: 'delete'
        };
      },
      invalidatesTags: (result, error, { articleId }) => [
        { type: 'User', id: 'ME' },
        { type: 'Articles', id: articleId }
      ]
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
