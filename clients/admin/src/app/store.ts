import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { rootApi, setStoreForAxios } from '@shared/api';
import { userSlice } from '@entities/user/model/slice';

export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [rootApi.reducerPath]: rootApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(rootApi.middleware),
});

setupListeners(store.dispatch);
setStoreForAxios(store.getState);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
