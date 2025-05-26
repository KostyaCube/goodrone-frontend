import { baseApi } from './APIbase';
import { URLs } from '@src/shared/constants';
import { IComment } from '@src/shared/types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation<void, { body: string; postId: number; replyOn?: string }>({
      query: (body) => {
        return {
          url: URLs.COMMENTS,
          method: 'post',
          body
        };
      },
      invalidatesTags: [{ type: 'Articles' }]
    }),

    editComment: builder.mutation<void, { id: string; body: string }>({
      query: (body) => {
        return {
          url: `${URLs.COMMENTS}/${body.id}`,
          method: 'put',
          body
        };
      },
      invalidatesTags: [{ type: 'Articles' }]
    }),

    deleteComment: builder.mutation<void, number | string>({
      query: (id) => {
        return {
          url: `${URLs.COMMENTS}/${id}`,
          method: 'delete'
        };
      },
      invalidatesTags: [{ type: 'Articles' }]
    }),

    likeComment: builder.mutation<void, { userId: number; commentId: number }>({
      query: (body) => {
        return {
          url: URLs.COMMENTS_LIKE,
          method: 'post',
          body
        };
      },
      invalidatesTags: [{ type: 'Articles' }, { type: 'User' }]
    }),

    getCommentsByUserId: builder.query<IComment[], string | undefined>({
      query: (userId) => {
        return `${URLs.COMMENTS}/${userId}`;
      }
    })
  })
});

export const { useAddCommentMutation, useEditCommentMutation, useDeleteCommentMutation, useLikeCommentMutation, useGetCommentsByUserIdQuery } = authApi;
