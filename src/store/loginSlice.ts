import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Models } from "appwrite";

export type UserState = {
    userData: Models.User<Models.Preferences> | null;
    isLoggedIn: boolean;
};

const initialState: UserState = {
    userData: null,
    isLoggedIn: false
}

const loginSlice = createSlice({
    name: "loginStatus",
    initialState,
    reducers: {
        checkLogin: (state, action: PayloadAction<Models.User<Models.Preferences>>) => {
            state.userData = action.payload;
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.userData = null;
            state.isLoggedIn = false;
        }
    }
});

export const { checkLogin, logout } = loginSlice.actions;
export default loginSlice.reducer

