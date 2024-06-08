/* eslint-disable prettier/prettier */
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice"
import { api } from "../../src/components/api/apiSlice"
// import bookReducer from '../features/books/booksSlice';

export const store = configureStore({
  reducer: {
    // books: bookReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
