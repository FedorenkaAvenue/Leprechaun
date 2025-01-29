import { configureStore, isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';

import { rootApi } from '@shared/api';
import { userSlice } from '@entities/user/model/slice';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => next => action => {
    if (isRejectedWithValue(action)) {
        console.warn(action);

        toast.error(
            //@ts-ignore
            action.payload.data?.message
                //@ts-ignore
                ? `${action.payload.status}. ${action.payload.data?.message}`
                : 'Unknown error...',
        )
    }

    return next(action)
}

export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [rootApi.reducerPath]: rootApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(rootApi.middleware, rtkQueryErrorLogger),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
