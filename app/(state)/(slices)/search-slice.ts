"use client";

import { YTVideoSearchResult } from "@/app/yt-video-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchBarState {
  value: {
    searchQuery: string;
    searchSuggestions: string[];
    searchResults: YTVideoSearchResult[];
  };
}

const initialState: SearchBarState = {
  value: {
    searchQuery: "",
    searchSuggestions: [],
    searchResults: [],
  },
};

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.value.searchQuery = action.payload;
    },
    updateSearchSuggestions: (state, action: PayloadAction<string[]>) => {
      state.value.searchSuggestions = action.payload;
    },
    updateSearchResults: (
      state,
      action: PayloadAction<YTVideoSearchResult[]>
    ) => {
      state.value.searchResults = action.payload;
    },
  },
});

export const {
  updateSearchQuery,
  updateSearchSuggestions,
  updateSearchResults,
} = searchSlice.actions;

export default searchSlice.reducer;
