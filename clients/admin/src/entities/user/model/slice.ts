import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UserRole } from "./enums";
import { signIn } from "../api";

interface UserState {
    isAuth: boolean
    role: UserRole | null
    isLoading: boolean
}

const initialState: UserState = {
    isAuth: false,
    role: null,
    isLoading: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(signInAction.fulfilled, (state, action) => {
            console.log(state);
            console.log(action.payload);

        })
    },
});

export const signInAction = createAsyncThunk('user/signin', signIn);

export const { } = userSlice.actions;
