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

    answerUp: builder.mutation<void, { answerId: number }>({
      query: (body) => {
        return {
          url: `${URLs.ANSWER_UP}`,
          method: 'post',
          body
        };
      },
      invalidatesTags: [{ type: 'User' }]
    }),

    answerDown: builder.mutation<void, { answerId: number }>({
      query: (body) => {
        return {
          url: `${URLs.ANSWER_DOWN}`,
          method: 'post',
          body
        };
      },
      invalidatesTags: [{ type: 'User' }]
    })
  })
});

export const { useCreateAnswerMutation, useAnswerUpMutation, useAnswerDownMutation } = answersApi;
