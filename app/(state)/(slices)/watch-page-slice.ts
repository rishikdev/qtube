"use client";

import { YTVideo } from "@/app/yt-video-types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum WatchPageStatus {
  Loading,
  LoadComplete,
  ErrorEncountered,
}

interface WatchState {
  value: {
    watchPageStatus: WatchPageStatus;
    currentVideoId: string;
    watchedVideos: YTVideo[];
    isVideoFetched: Boolean;
  };
}

const initialState: WatchState = {
  value: {
    watchPageStatus: WatchPageStatus.Loading,
    currentVideoId: "",
    watchedVideos: [],
    isVideoFetched: false,
  },
};

export const watchPageSlice = createSlice({
  name: "watchPageSlice",
  initialState,
  reducers: {
    updateWatchPageStatus(state, newStatus: PayloadAction<WatchPageStatus>) {
      state.value.watchPageStatus = newStatus.payload;
    },

    updateCurrentVideoId(state, newVideoId: PayloadAction<string>) {
      state.value.currentVideoId = newVideoId.payload;
    },

    updateWatchedVideos(state, video: PayloadAction<YTVideo[]>) {
      state.value.watchedVideos = video.payload;
    },

    updateIsVideoFetched(state, isFetched: PayloadAction<Boolean>) {
      state.value.isVideoFetched = isFetched.payload;
    },
  },
});

export const {
  updateWatchPageStatus,
  updateCurrentVideoId,
  updateWatchedVideos,
  updateIsVideoFetched,
} = watchPageSlice.actions;

export default watchPageSlice.reducer;
