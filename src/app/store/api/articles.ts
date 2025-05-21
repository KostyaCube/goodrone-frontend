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

    getPosts: builder.query<IArticle[], { lang: string; skip?: string; userUUID?: string; order?: string; saved?: string }>({
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
        if (params.userUUID) {
          queryParams.append('userUUID', params.userUUID);
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

    deletePost: builder.mutation<void, number | string>({
      query: (id) => {
        return {
          url: `${URLs.ARTICLES}/${id}`,
          method: 'delete'
        };
      },
      invalidatesTags: [{ type: 'Articles' }]
    })
  })
});

export const { useGetPostsQuery, useGetOnePostQuery, useGetUserPostsLengthQuery, usePostViewMutation, usePostLikeMutation, useDeletePostMutation } =
  articlesApi;
