"use client";

import {
  NavbarTrigger,
  collapseNavbar,
} from "@/app/(state)/(slices)/navbar-slice";
import {
  updateNextPageToken,
  updateSearchQuery,
  updateSearchResults,
  updateSearchSuggestions,
} from "@/app/(state)/(slices)/search-slice";
import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import { cn } from "@/lib/utils";
import { MoveUpLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import {
  HomePageStatus,
  updateHomePageStatus,
} from "@/app/(state)/(slices)/home-page-slice";
import { themeHoverGradientRightStop } from "@/app/styles.module";
import { FormEvent, useEffect, useState } from "react";
import { YTSearchResponse } from "@/app/yt-video-types";

const SearchSuggestions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const suggestions = useAppSelector(
    (state) => state.searchReducer.value.searchSuggestions
  );
  const [localSuggestions, setLocalSuggestions] = useState<string[]>();
  useEffect(() => {
    setLocalSuggestions(suggestions);
  }, [suggestions]);

  async function handleSearch(suggestion: string) {
    const promises: Promise<YTSearchResponse | undefined>[] = [];
    try {
      promises.push(fetchVideos(suggestion));
    } catch (error) {}

    Promise.all(promises).then((responses) => {
      if (responses != undefined) {
        responses.forEach((response) => {
          if (response != undefined) {
            dispatch(updateSearchQuery(suggestion));
            dispatch(updateSearchSuggestions([]));
            dispatch(updateSearchResults(response.items));
            dispatch(updateNextPageToken(response.nextPageToken));
            dispatch(updateHomePageStatus(HomePageStatus.LoadingComplete));
          }
        });
      }
    });
  }

  async function fetchVideos(
    suggestion: string
  ): Promise<YTSearchResponse | undefined> {
    dispatch(updateHomePageStatus(HomePageStatus.Loading));
    dispatch(collapseNavbar(NavbarTrigger.SearchButton));

    const response = await fetch("/api/search-results", {
      method: "POST",
      body: JSON.stringify({ searchQuery: suggestion }),
    });

    if (response.ok) {
      const body = await response.json();
      if (body.items != undefined) {
        return body;
      } else {
        dispatch(updateHomePageStatus(HomePageStatus.Error));
      }
    } else {
      dispatch(updateHomePageStatus(HomePageStatus.Error));
    }
  }

  function appendSuggestion(suggestion: string) {
    dispatch(updateSearchQuery(suggestion + " "));
    document.getElementById("search-bar")!.focus();
  }

  return (
    <div className="grid content-center">
      {localSuggestions != undefined &&
        localSuggestions.length != 0 &&
        localSuggestions.map((suggestion: string) => (
          <div
            key={suggestion}
            className={cn(
              "flex mx-2 text-lg md:text-base transition-all cursor-pointer",
              themeHoverGradientRightStop
            )}
          >
            <div
              onClick={() => handleSearch(suggestion)}
              className="flex-1 m-2"
            >
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
