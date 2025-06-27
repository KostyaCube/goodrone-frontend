import { baseApi } from './APIbase';
import { URLs } from '@src/shared/constants';
import { IComment } from '@src/shared/types';

const commentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation<void, { body: string; postId: number; replyOn?: number }>({
      query: (body) => {
        return {
          url: URLs.COMMENTS,
          method: 'post',
          body
        };
      },
      invalidatesTags: (result, error, { postId }) => [{ type: 'Articles', id: postId }]
    }),

    editComment: builder.mutation<void, { id: string; commentBody: string; postId: number }>({
      query: ({ id, commentBody }) => ({
        url: `${URLs.COMMENTS}/${id}`,
        method: 'PUT',
        body: { body: commentBody }
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: 'Articles', id: postId }]
    }),

    deleteComment: builder.mutation<void, { id: string; postId: number }>({
      query: ({ id }) => {
        return {
          url: `${URLs.COMMENTS}/${id}`,
          method: 'delete'
        };
      },
      invalidatesTags: (result, error, { postId }) => [{ type: 'Articles', id: postId }]
    }),

    likeComment: builder.mutation<void, { commentId: number }>({
      query: (body) => {
        return {
          url: `${URLs.COMMENTS_LIKE}/${body.commentId}`,
          method: 'post'
        };
      },
      invalidatesTags: [{ type: 'User', id: 'ME' }]
    }),

    getCommentsByUserId: builder.query<IComment[], string | undefined>({
      query: (userId) => {
        return `${URLs.COMMENTS}/${userId}`;
      },
      providesTags: (result, error, userId) => [{ type: 'User', id: userId }]
    })
  })
});

export const { useAddCommentMutation, useEditCommentMutation, useDeleteCommentMutation, useLikeCommentMutation, useGetCommentsByUserIdQuery } = commentsApi;
