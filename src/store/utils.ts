import { FetchBaseQueryArgs } from '@reduxjs/toolkit/query';

export const baseQuery: FetchBaseQueryArgs = {
  baseUrl: import.meta.env.VITE_GITHUB_BASE_API_URL,
  prepareHeaders: headers => {
    const token = import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN;
    headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
};
