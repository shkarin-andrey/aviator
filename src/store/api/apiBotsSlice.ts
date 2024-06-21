import { api } from './api';

export const apiBotsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getBots: builder.query<any, void>({
      query: () => ({
        url: `bots`,
      }),
    }),
    getBotsUsername: builder.query<any, string>({
      query: (botUsername) => ({
        url: `bots/${botUsername}`,
        params: {
          botUsername,
        },
      }),
    }),
    deleteBotsUsername: builder.mutation<void, string>({
      query: (botUsername) => ({
        url: `bots/${botUsername}`,
        method: 'DELETE',
        params: {
          botUsername,
        },
      }),
    }),
  }),
});

export const { useGetBotsQuery, useGetBotsUsernameQuery, useDeleteBotsUsernameMutation } = apiBotsSlice;
