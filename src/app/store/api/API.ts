import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, URLs } from '@src/shared/constants';
import { ISignin, ISignup, AuthResponse } from '@src/shared/types';

export const API = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    }
  }),

  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, ISignin>({
      query: (credentials) => ({
        url: URLs.SIGNIN,
        method: 'POST',
        body: credentials
      })
    }),

    register: builder.mutation<AuthResponse, ISignup>({
      query: (credentials) => ({
        url: URLs.SIGNUP,
        method: 'POST',
        body: credentials
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation } = API;
