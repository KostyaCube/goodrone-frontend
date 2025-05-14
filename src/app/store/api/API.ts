import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, URLs } from '@src/shared/constants';
import { User } from '@src/shared/types';

export const API = createApi({
  reducerPath: 'questions',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    }
  }),

  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; user: User }, { email: string; password: string }>({
      query: (credentials) => ({
        url: URLs.SIGNIN,
        method: 'POST',
        body: credentials
      })
    })
  })
});

export const { useLoginMutation } = API;
