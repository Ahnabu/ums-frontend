import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

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
     
const baseQueryWithRefreshToken = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // Try to refresh the token
        const refreshResult = await baseQuery('/auth/refresh-token', api, extraOptions);
        if (refreshResult.data) {
            // If refresh was successful, retry the original query
            const token = (refreshResult.data as { accessToken: string }).accessToken;
            api.dispatch({ type: 'auth/setToken', payload: token });
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
}
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken, 
    endpoints: () => ({
        
    })
})