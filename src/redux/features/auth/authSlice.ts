import type { RootState } from './../../store';
import { createSlice } from "@reduxjs/toolkit"
export type TUser = {
    userId: string,
    role: string,
    iat: number,
    exp: number,
}
type TAuthState = {
    user: TUser | null,
    token: null | string,
}
const initialState:TAuthState = {
    user: null,
    token: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
})

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => {
    return state.auth.token;
}
export const selectCurrentUser = (state: RootState) => {
    return state.auth.user;
}