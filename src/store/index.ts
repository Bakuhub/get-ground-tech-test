import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import bookReducer from "./slices/booksSlice";
import thunk from 'redux-thunk'
export const store = configureStore({
                                        reducer: {
                                            book:bookReducer,
                                        },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

                                    });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;