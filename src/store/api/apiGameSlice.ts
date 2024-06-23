import { CloseRequest, DefaultApiRequest, UpdateBetRequest, UserInfoResponse, WithdrawRequest } from '../../interfaces';
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
    updateBet: builder.mutation<any, UpdateBetRequest>({
      query: ({ webAppData, userGame, amount }) => ({
        url: `bet`,
        method: 'POST',
        body: {
          webAppData,
          userGame,
          amount,
        },
      }),
    }),
    close: builder.mutation<any, CloseRequest>({
      query: ({ webAppData, userGame, betId, roundId }) => ({
        url: `close`,
        method: 'POST',
        body: {
          webAppData,
          userGame,
          betId,
          roundId,
        },
      }),
    }),
    withdraw: builder.mutation<any, WithdrawRequest>({
      query: ({ webAppData, userGame, credentials, amount }) => ({
        url: `withdraw`,
        method: 'POST',
        body: {
          webAppData,
          userGame,
          credentials,
          amount,
        },
      }),
    }),
  }),
});

export const { useGetUserInfoMutation, useCloseMutation, useWithdrawMutation, useUpdateBetMutation } = apiGameSlice;
