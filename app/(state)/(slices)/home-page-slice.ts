"use client";

import { createSlice } from "@reduxjs/toolkit";

export enum HomePageStatus {
  Fresh,
  Returning,
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
    updateHomePageStatus(state) {
      state.value.homePageStatus = HomePageStatus.Returning;
    },
  },
});

export const { updateHomePageStatus } = homePageSlice.actions;

export default homePageSlice.reducer;
