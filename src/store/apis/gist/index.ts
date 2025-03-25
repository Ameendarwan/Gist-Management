import { CreateGistPayload, Gist } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@app/store/utils';

export const gistApi = createApi({
  reducerPath: 'gistApi',
  baseQuery: fetchBaseQuery(baseQuery),
  tagTypes: ['Gist'],
  endpoints: builder => ({
    getPublicGists: builder.query<Gist[], { page?: number; perPage?: number }>({
      query: ({ page = 1, perPage = 10 }) => `gists/public?page=${page}&per_page=${perPage}`,
      providesTags: ['Gist'],
    }),
    getStarredGists: builder.query<Gist[], { page?: number; perPage?: number }>({
      query: ({ page = 1, perPage = 10 }) => `gists/starred?page=${page}&per_page=${perPage}`,
      providesTags: ['Gist'],
    }),
    getUserGists: builder.query<Gist[], { page?: number; perPage?: number }>({
      query: ({ page = 1, perPage = 10 }) => `gists?page=${page}&per_page=${perPage}`,
      providesTags: ['Gist'],
    }),
    checkStarredGist: builder.query<boolean, { gistId: string }>({
      query: ({ gistId }) => `gists/${gistId}/star`,
      providesTags: ['Gist'],
    }),
    getGistDetails: builder.query<Gist, string>({
      query: gistId => `gists/${gistId}`,
      providesTags: (result, error, id) => [{ type: 'Gist', id }],
    }),
    starGist: builder.mutation<void, { gistId: string }>({
      query: ({ gistId }) => ({
        url: `gists/${gistId}/star`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, { gistId }) => [{ type: 'Gist', id: gistId }],
    }),
    unstarGist: builder.mutation<void, string>({
      query: gistId => ({
        url: `gists/${gistId}/star`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, gistId) => [{ type: 'Gist', id: gistId }],
    }),
    forkGist: builder.mutation<void, { gistId: string }>({
      query: ({ gistId }) => ({
        url: `gists/${gistId}/forks`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { gistId }) => [{ type: 'Gist', id: gistId }],
    }),
    createGist: builder.mutation<void, CreateGistPayload>({
      query: body => ({
        url: '/gists',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetPublicGistsQuery,
  useGetUserGistsQuery,
  useGetStarredGistsQuery,
  useGetGistDetailsQuery,
  useCreateGistMutation,
  useStarGistMutation,
  useUnstarGistMutation,
  useForkGistMutation,
  useCheckStarredGistQuery,
} = gistApi;
