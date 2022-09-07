import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterReducer from "./features/counter/counterSlice";
import axios from "axios";

const http = axios.create({
  baseURL: "https://run.mocky.io/v3/",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { http },
        },
      }),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
