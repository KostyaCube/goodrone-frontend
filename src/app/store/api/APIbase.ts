import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, URLs } from '@src/shared/constants';
import { IKeyword } from '@src/shared/types';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');
      const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['User', 'Articles', 'Words', 'Questions'],

  endpoints: (builder) => ({
    getKeywords: builder.query<IKeyword[], number>({
      query: (take) => (take > 0 ? `${URLs.KEYWORDS}?take=${take}` : URLs.KEYWORDS),
      providesTags: [{ type: 'Words' }]
    }),

    deleteFile: builder.mutation<void, string>({
      query: (id) => {
        return {
          url: `${URLs.FILE}/${id}`,
          method: 'delete'
        };
      },
      invalidatesTags: [{ type: 'Questions' }]
    })
  })
});

export const { useGetKeywordsQuery, useDeleteFileMutation } = baseApi;
