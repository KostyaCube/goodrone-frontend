import { IProfile, ISubscription, User } from '@src/shared/types';
import { baseApi } from './APIbase';
import { URLs } from '@src/shared/constants';

const authorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfoById: builder.query<User, string>({
      query: (id) => `${URLs.USER}/${id}`,
      providesTags: [{ type: 'User' }]
    }),

    getAuthorProfile: builder.query<IProfile, string>({
      query: (id) => `${URLs.PROFILE}/${id}`,
      providesTags: [{ type: 'User' }]
    }),

    createSubs: builder.mutation<ISubscription, { subscriberId: number; subscribedToId: number }>({
      query: (body) => {
        return {
          url: URLs.SUBSCRIPTION,
          method: 'post',
          body
        };
      },
      invalidatesTags: [{ type: 'User' }]
    }),

    deleteSubs: builder.mutation<void, number | string>({
      query: (id) => {
        return {
          url: `${URLs.SUBSCRIPTION_DEL}/${id}`,
          method: 'delete'
        };
      },
      invalidatesTags: [{ type: 'User' }]
    })
  })
});

export const { useGetUserInfoByIdQuery, useCreateSubsMutation, useDeleteSubsMutation, useGetAuthorProfileQuery } = authorsApi;
