import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { REACT_APP_BASE_URL_API } = process.env;

const staticApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: REACT_APP_BASE_URL_API,
  }),
  endpoints: () => ({}),
});

export const api = staticApi.enhanceEndpoints({ addTagTypes: [] });
