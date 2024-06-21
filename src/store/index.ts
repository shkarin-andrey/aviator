import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api/api';
import globalSlice from './slices/globalSlice';

const { NODE_ENV } = process.env;

const rootReducer = combineReducers({
  global: globalSlice,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  devTools: NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
