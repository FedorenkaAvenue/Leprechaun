import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@app/store";

interface ErrorState {
    hasError: boolean;
    status?: number;
    message?: string;
}

const initialState: ErrorState = {
    hasError: false,
    status: undefined,
    message: undefined,
};

export const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<{ status: number; message: string }>) => {
            state.hasError = true;
            state.status = action.payload.status;
            state.message = action.payload.message;
        },
        clearError: (state) => {
            state.hasError = false;
            state.status = undefined;
            state.message = undefined;
        },
    },
});

export const errorSetAction = errorSlice.actions.setError;
export const errorClearAction = errorSlice.actions.clearError;

export const errorSelector = (state: RootState) => state.error;
