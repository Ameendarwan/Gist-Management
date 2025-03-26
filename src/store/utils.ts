import { FetchBaseQueryArgs } from '@reduxjs/toolkit/query';
import auth from '@app/utils/auth';

export const baseQuery: FetchBaseQueryArgs = {
  baseUrl: import.meta.env.VITE_GITHUB_BASE_API_URL,
  prepareHeaders: headers => {
    const token = auth.token();
    if (!!token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
};
