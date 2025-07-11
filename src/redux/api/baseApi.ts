/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery, type BaseQueryApi, type BaseQueryFn, type FetchArgs } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token; 
        if (token) {
            headers.set('authorization', `${token}`);
        }
        return headers;
    }
})
     
const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, unknown> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    const errorData = result?.error?.data;
    const message = (typeof errorData === 'object' && errorData !== null && 'message' in errorData)
      ? (errorData as { message?: string }).message
      : 'An error occurred';
    toast.error(message);
  }
  if (result?.error?.status === 401) {
    //* Send Refresh
    console.log('Sending refresh token');

    const res = await fetch('http://localhost:5000/api/v1/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
}

export const baseApi = createApi({
    reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken, 
     tagTypes: ['semester', 'courses','offeredCourse'],
    endpoints: () => ({
        
    })
})