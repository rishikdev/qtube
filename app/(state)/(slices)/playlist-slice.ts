"use client";

import { PlaylistVideo, YTVideo } from "@/app/yt-video-types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum PlaylistStatus {
  Loading,
  LoadComplete,
  ErrorEncountered,
}

interface PlaylistState {
  value: {
    playlistStatus: PlaylistStatus;
    videos: PlaylistVideo[];
  };
}

const initialState: PlaylistState = {
  value: {
    playlistStatus: PlaylistStatus.Loading,
    videos: [],
  },
};

export const playlistSlice = createSlice({
  name: "playlistSlice",
  initialState,
  reducers: {
    updatePlaylistStatus(state, newStatus: PayloadAction<PlaylistStatus>) {
      state.value.playlistStatus = newStatus.payload;
    },
    updatePlaylist(state, videos: PayloadAction<PlaylistVideo[]>) {
      state.value.videos = videos.payload;
    },
  },
});

export const { updatePlaylistStatus, updatePlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
