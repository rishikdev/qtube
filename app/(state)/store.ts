"use client";

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import navbarSliceReducer from "./(slices)/navbar-slice";
import searchReducer from "./(slices)/search-slice";
import homePageReducer from "./(slices)/home-page-slice";
import playlistReducer from "./(slices)/playlist-slice";
import watchReducer from "./(slices)/watch-slice";

export const store = configureStore({
  reducer: {
    navbarSliceReducer,
    searchReducer,
    homePageReducer,
    playlistReducer,
    watchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
