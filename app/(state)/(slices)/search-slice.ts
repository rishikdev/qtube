"use client";

import { YTVideoSearchResult } from "@/app/yt-video-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchBarState {
  value: {
    searchQuery: string;
    searchSuggestions: string[];
    searchResults: YTVideoSearchResult[];
    nextPageToken: string;
    totalResults: number;
  };
}

const initialState: SearchBarState = {
  value: {
    searchQuery: "",
    searchSuggestions: [],
    searchResults: [],
    nextPageToken: "",
    totalResults: 0,
  },
};

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    updateSearchQuery: (state, newSearchQuery: PayloadAction<string>) => {
      state.value.searchQuery = newSearchQuery.payload;
    },
    updateSearchSuggestions: (
      state,
      newSearchSuggestions: PayloadAction<string[]>
    ) => {
      state.value.searchSuggestions = newSearchSuggestions.payload;
    },
    updateSearchResults: (
      state,
      newSearchResults: PayloadAction<YTVideoSearchResult[]>
    ) => {
      state.value.searchResults = newSearchResults.payload;
    },

    updateNextPageToken: (state, nextPageToken: PayloadAction<string>) => {
      state.value.nextPageToken = nextPageToken.payload;
    },

    updateTotalResults: (state, totalResults: PayloadAction<number>) => {
      state.value.totalResults = totalResults.payload;
    },
  },
});

export const {
  updateSearchQuery,
  updateSearchSuggestions,
  updateSearchResults,
  updateNextPageToken,
  updateTotalResults,
} = searchSlice.actions;

export default searchSlice.reducer;
