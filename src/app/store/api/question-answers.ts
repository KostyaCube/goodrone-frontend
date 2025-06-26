import { IProfile, ISubscription, User } from '@src/shared/types';
import { baseApi } from './APIbase';
import { URLs } from '@src/shared/constants';

const answersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAnswer: builder.mutation<void, FormData>({
      query: (body) => {
        return {
          url: URLs.ANSWERS,
          method: 'post',
          body
        };
      },
      invalidatesTags: [{ type: 'User' }]
    }),

    editAnswer: builder.mutation<void, { answerId: number; formData: FormData }>({
      query: ({ answerId, formData }) => {
        return {
          url: `${URLs.ANSWERS}/${answerId}`,
          method: 'PUT',
          body: formData
        };
      },
      invalidatesTags: [{ type: 'User' }]
    }),

    deleteAnswer: builder.mutation<void, { answerId: number }>({
      query: ({ answerId }) => {
        return {
          url: `${URLs.ANSWERS}/${answerId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: [{ type: 'User' }]
    }),

    answerUp: builder.mutation<void, { answerId: number }>({
      query: (body) => {
        return {
          url: `${URLs.ANSWER_UP}/${body.answerId}`,
          method: 'post'
        };
      },
      invalidatesTags: [{ type: 'User' }]
    }),

    answerDown: builder.mutation<void, { answerId: number }>({
      query: (body) => {
        return {
          url: `${URLs.ANSWER_DOWN}/${body.answerId}`,
          method: 'post'
        };
      },
      invalidatesTags: [{ type: 'User' }]
    })
  })
});

export const { useCreateAnswerMutation, useAnswerUpMutation, useAnswerDownMutation, useEditAnswerMutation, useDeleteAnswerMutation } = answersApi;
