import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { rootApi } from '@shared/api';
import { setStoreForAxios } from '@shared/api/client';
import { authSlice } from '@shared/models/slices/auth';
import { errorSlice } from '@shared/models/slices/error';

export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [rootApi.reducerPath]: rootApi.reducer,
        [errorSlice.reducerPath]: errorSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(rootApi.middleware),
});

setupListeners(store.dispatch);
setStoreForAxios(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
