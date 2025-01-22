import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';

import { rootApi } from '@shared/api';

export const store = configureStore({
    reducer: {
        [rootApi.reducerPath]: rootApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(rootApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
