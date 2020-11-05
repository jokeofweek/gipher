import {
  ThunkAction,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { AppActionTypes, ApplicationState } from "./types";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), thunk],
});

export type RootState = { app: ApplicationState };

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActionTypes
>;
