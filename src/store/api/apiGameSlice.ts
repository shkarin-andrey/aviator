import { DefaultApiRequest } from '../../interfaces/DefaultApiRequest.interface';
import { UserInfoResponse } from '../../interfaces/UserInfoResponse.interface';
import { api } from './api';

export const apiGameSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.mutation<UserInfoResponse, DefaultApiRequest>({
      query: ({ webAppData, userGame }) => ({
        url: `user-info`,
        method: 'POST',
        body: {
          webAppData,
          userGame,
        },
      }),
    }),
  }),
});

export const { useGetUserInfoMutation } = apiGameSlice;
