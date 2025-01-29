import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { signIn } from "../api";
import { AuthSuccessDTO } from "../api/dto";
import { User } from "./interfaces";
import { RootState } from "@app/store";

interface UserState {
    isAuth: boolean
    accessToken: AuthSuccessDTO['access_token'] | null
    data: User | null
}

const initialState: UserState = {
    isAuth: false,
    accessToken: null,
    data: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(userSignInAction.fulfilled, (state, { payload }) => {
            state = Object.assign(state, {
                ...state,
                accessToken: payload.access_token,
                isAuth: true,
                data: payload.user,
            });
        })
    },
});

export const userSignInAction = createAsyncThunk('user/signin', signIn);

export const { } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;
