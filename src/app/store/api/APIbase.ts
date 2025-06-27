import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { API_URL, URLs } from '@src/shared/constants';
import { IKeyword, User } from '@src/shared/types';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { notification } from 'antd';
import { getNestErrorMessage } from '@src/shared/utils';
import { logout } from '../reducers/user';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    headers.set('Access-Control-Allow-Origin', '*');
    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithNotify: BaseQueryFn<any, unknown, unknown> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if ('error' in result) {
    const message = getNestErrorMessage(result.error as FetchBaseQueryError);

    notification.error({
      message: 'Error',
      description: message
    });

    if (result.error && result.error.status === 401) {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithNotify,
  tagTypes: ['User', 'Articles', 'Words', 'Questions'],

  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => `${URLs.ME}`,
      providesTags: [{ type: 'User', id: 'ME' }]
    }),

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

export const { useGetKeywordsQuery, useDeleteFileMutation, useGetMeQuery } = baseApi;
