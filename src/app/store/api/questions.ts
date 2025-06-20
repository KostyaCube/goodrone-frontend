import { IQuestion } from '@src/shared/types';
import { baseApi } from './APIbase';
import { URLs } from '@src/shared/constants';

const questionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuestion: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: URLs.QUESTIONS,
          method: 'post',
          body
        };
      },
      invalidatesTags: [{ type: 'Questions' }, { type: 'Words' }]
    }),

    updateQuestion: builder.mutation<void, { id: string; formData: FormData }>({
      query: (body) => {
        return {
          url: `${URLs.QUESTIONS}/${body.id}`,
          method: 'put',
          body: body.formData
        };
      },
      invalidatesTags: [{ type: 'Questions' }, { type: 'User' }, { type: 'Words' }]
    }),

    getQuestions: builder.query<IQuestion[], { keywords: string[]; order: string; userID: string; skip: string }>({
      query: (params = { keywords: [], order: '', userID: '', skip: '' }) => {
        if (params.keywords.length === 0) {
          return `${URLs.QUESTIONS}?order=${params.order}&userID=${params.userID}&skip=${params.skip}`;
        }
        const queryParameters = params.keywords.join('&keywords=');
        return `${URLs.QUESTIONS}?keywords=${queryParameters}&order=${params.order}&userID=${params.userID}&skip=${params.skip}`;
      },
      providesTags: [{ type: 'Questions' }]
    }),

    getQuestionById: builder.query<IQuestion, string | undefined>({
      query: (id) => `${URLs.QUESTIONS}/${id}`,
      providesTags: [{ type: 'User' }]
    }),

    deleteQuestion: builder.mutation<void, number | string>({
      query: (id) => {
        return {
          url: `${URLs.QUESTIONS}/${id}`,
          method: 'delete'
        };
      },
      invalidatesTags: [{ type: 'Questions' }]
    }),

    makeViewed: builder.mutation<void, string | undefined>({
      query: (id) => {
        return {
          url: `${URLs.QUESTIONS_MAKE_VIEWED}/${id}`,
          method: 'get'
        };
      },
      invalidatesTags: [{ type: 'Questions' }, { type: 'User' }]
    }),

    getQuestionsSearch: builder.query<IQuestion[], string>({
      query: (searchString) => `${URLs.QUESTIONS_SEARCH}/${searchString}`
    }),

    getQuestionsCount: builder.query<number, void>({
      query: () => URLs.QUESTIONS_LENGTH,
      providesTags: [{ type: 'Questions' }]
    }),

    voteQuestion: builder.mutation<void, { questionId: number }>({
      query: (body) => {
        return {
          url: `${URLs.QUESTIONS_LIKE}/${body.questionId}`,
          method: 'post'
        };
      },
      invalidatesTags: [{ type: 'Questions' }, { type: 'User' }]
    }),

    saveToFavorites: builder.mutation<void, { questionId: number }>({
      query: (params) => {
        return {
          url: `${URLs.QUESTIONS_FAVORITES}/${params.questionId}`,
          method: 'post'
        };
      },
      invalidatesTags: [{ type: 'User' }]
    }),

    removeFromFavorites: builder.mutation<void, { questionId: number }>({
      query: (params) => {
        return {
          url: `${URLs.QUESTIONS_FAVORITES}/${params.questionId}`,
          method: 'delete'
        };
      },
      invalidatesTags: [{ type: 'User' }]
    })
  })
});

export const {
  useGetQuestionsQuery,
  useGetQuestionByIdQuery,
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useMakeViewedMutation,
  useUpdateQuestionMutation,
  useGetQuestionsCountQuery,
  useVoteQuestionMutation,
  useSaveToFavoritesMutation,
  useRemoveFromFavoritesMutation
} = questionsApi;
