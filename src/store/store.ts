import { configureStore } from "@reduxjs/toolkit";
import { baseApi, authApi } from "../api/api.routes";
import globalIdReducer from "../slices/globalid.slice";
import loginFormReducer from "../slices/login.slice";

export const store = configureStore({
  reducer: {
    globalIdSlice: globalIdReducer,
    loginFormSlice: loginFormReducer,
    [authApi.reducerPath]: authApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
