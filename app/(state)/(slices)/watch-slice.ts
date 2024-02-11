"use client";

import { YTVideo } from "@/app/yt-video-types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface WatchState {
  value: {
    videos: YTVideo[];
  };
}

const initialState: WatchState = {
  value: {
    videos: [
      {
        kind: "",
        id: "",
        snippet: {
          publishedAt: "",
          title: "",
          description: "",
          thumbnails: {
            default: {
              url: "",
              width: 0,
              height: 0,
            },
            medium: {
              url: "",
              width: 0,
              height: 0,
            },
            high: {
              url: "",
              width: 0,
              height: 0,
            },
          },
          channelTitle: "",
        },
        statistics: {
          viewCount: "",
          likeCount: "",
          favoriteCount: "",
          commentCount: "",
        },
      },
    ],
  },
};

export const watchSlice = createSlice({
  name: "watchSlice",
  initialState,
  reducers: {
    updateWatch(state, video: PayloadAction<YTVideo[]>) {
      state.value.videos = video.payload;
    },
  },
});

export const { updateWatch } = watchSlice.actions;

export default watchSlice.reducer;
