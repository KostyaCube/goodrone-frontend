import { IProfile, ISubscription, User } from '@src/shared/types';
import { baseApi } from './APIbase';
import { URLs } from '@src/shared/constants';

const authorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfoById: builder.query<User, string>({
      query: (id) => `${URLs.USER}/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }]
    }),

    getAuthorProfile: builder.query<IProfile, string>({
      query: (id) => `${URLs.PROFILE}/${id}`,
      providesTags: (result, error, id) => [{ type: 'Profile', id }]
    }),

    createSubs: builder.mutation<ISubscription, { subscriberId: number; subscribedToId: number }>({
      query: (body) => {
        return {
          url: URLs.SUBSCRIPTION,
          method: 'post',
          body
        };
      },
      invalidatesTags: (result, error, { subscriberId, subscribedToId }) => [
        { type: 'User', id: subscriberId },
        { type: 'User', id: subscribedToId }
      ]
    }),

    deleteSubs: builder.mutation<void, number | string>({
      query: (id) => {
        return {
          url: `${URLs.SUBSCRIPTION_DEL}/${id}`,
          method: 'delete'
        };
      },
      invalidatesTags: [{ type: 'User', id: 'ME' }]
    })
  })
});

export const { useGetUserInfoByIdQuery, useCreateSubsMutation, useDeleteSubsMutation, useGetAuthorProfileQuery } = authorsApi;
