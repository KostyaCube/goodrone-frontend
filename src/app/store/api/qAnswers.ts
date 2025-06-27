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
      invalidatesTags: (result, error, formData) => {
        const questionId = Number(formData.get('questionId'));
        return [{ type: 'Questions', id: questionId }];
      }
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

    deleteAnswer: builder.mutation<void, { answerId: number; questionId: number }>({
      query: ({ answerId }) => {
        return {
          url: `${URLs.ANSWERS}/${answerId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, { questionId }) => [{ type: 'Questions', id: questionId }]
    }),

    answerUp: builder.mutation<void, { answerId: number }>({
      query: (body) => {
        return {
          url: `${URLs.ANSWER_UP}/${body.answerId}`,
          method: 'post'
        };
      },
      invalidatesTags: [{ type: 'User', id: 'ME' }]
    }),

    answerDown: builder.mutation<void, { answerId: number }>({
      query: (body) => {
        return {
          url: `${URLs.ANSWER_DOWN}/${body.answerId}`,
          method: 'post'
        };
      },
      invalidatesTags: [{ type: 'User', id: 'ME' }]
    })
  })
});

export const { useCreateAnswerMutation, useAnswerUpMutation, useAnswerDownMutation, useEditAnswerMutation, useDeleteAnswerMutation } = answersApi;
