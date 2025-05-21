import { baseApi } from './APIbase';
import { URLs } from '@src/shared/constants';
import { ISignin, ISignup, AuthResponse } from '@src/shared/types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, ISignin>({
      query: (credentials) => ({
        url: URLs.SIGNIN,
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: [{ type: 'User' }]
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

export const { useLoginMutation, useRegisterMutation } = authApi;
