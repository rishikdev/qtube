"use client";

import { YTVideoSearchResult } from "@/app/yt-video-types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PlaylistState {
  value: {
    videos: YTVideoSearchResult[];
  };
}

const initialState: PlaylistState = {
  value: {
    videos: [],
  },
};

export const playlistSlice = createSlice({
  name: "playlistSlice",
  initialState,
  reducers: {
    updatePlaylist(state, videos: PayloadAction<YTVideoSearchResult[]>) {
      state.value.videos = videos.payload;
    },
  },
});

export const { updatePlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
