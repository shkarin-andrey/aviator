import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { REACT_APP_API_URL } = process.env;

const staticApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: REACT_APP_API_URL,
  }),
  endpoints: () => ({}),
});

export const api = staticApi.enhanceEndpoints({ addTagTypes: [] });
