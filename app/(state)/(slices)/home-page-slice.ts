"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum HomePageStatus {
  Fresh,
  Loading,
  LoadingComplete,
  Error,
}

interface HomePageState {
  value: {
    homePageStatus: HomePageStatus;
  };
}

const initialState: HomePageState = {
  value: {
    homePageStatus: HomePageStatus.Fresh,
  },
};

export const homePageSlice = createSlice({
  name: "homePageSlice",
  initialState,
  reducers: {
    updateHomePageStatus(state, newStatus: PayloadAction<HomePageStatus>) {
      state.value.homePageStatus = newStatus.payload;
    },
  },
});

export const { updateHomePageStatus } = homePageSlice.actions;

export default homePageSlice.reducer;
