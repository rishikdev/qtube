"use client";

import {
  NavbarTrigger,
  collapseNavbar,
} from "@/app/(state)/(slices)/navbar-slice";
import {
  updateSearchQuery,
  updateSearchResults,
  updateSearchSuggestions,
} from "@/app/(state)/(slices)/search-slice";
import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import { YTVideo, YTVideoSearchResult } from "@/app/yt-video-types";
import { cn } from "@/lib/utils";
import { MoveUpLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { updateHomePageStatus } from "@/app/(state)/(slices)/home-page-slice";
import { themeHoverGradientRightStop } from "@/app/styles.module";

const SearchSuggestions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const suggestions = useAppSelector(
    (state) => state.searchReducer.value.searchSuggestions
  );

  async function fetchVideos(suggestion: string) {
    const response = await fetch("/api/search-results", {
      method: "POST",
      body: JSON.stringify({ searchQuery: suggestion }),
    });

    if (response.ok) {
      const body = await response.json();
      const searchResults = body.searchResults;
      dispatch(updateSearchQuery(suggestion));
      dispatch(updateSearchSuggestions([]));
      dispatch(updateSearchResults(searchResults));
      dispatch(collapseNavbar(NavbarTrigger.SearchButton));
      dispatch(updateHomePageStatus());
    }
  }

  // async function fetchVideos(suggestion: string) {
  //   dispatch(updateSearchQuery(suggestion));
  //   dispatch(collapseNavbar(NavbarTrigger.SearchButton));
  // }

  function appendSuggestion(suggestion: string) {
    dispatch(updateSearchQuery(suggestion + " "));
    document.getElementById("search-bar")!.focus();
  }

  return (
    <div className="grid content-center">
      {suggestions.length != 0 &&
        suggestions.map((suggestion: string) => (
          <div
            key={suggestion}
            className={cn(
              "flex mx-2 text-lg md:text-base transition-all cursor-pointer",
              themeHoverGradientRightStop
            )}
          >
            <div onClick={() => fetchVideos(suggestion)} className="flex-1 m-2">
              <div id="suggestion" className={cn("font-semibold")}>
                {suggestion}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => appendSuggestion(suggestion)}
              id="append-suggestion"
              className={cn("flex-none", themeHoverGradientRightStop)}
            >
              <MoveUpLeft className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
        ))}
    </div>
  );
};

export default SearchSuggestions;
