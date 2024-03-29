"use client";

import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { FormEvent, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useDispatch } from "react-redux";
import {
  updateNextPageToken,
  updateSearchQuery,
  updateSearchResults,
  updateSearchSuggestions,
} from "@/app/(state)/(slices)/search-slice";
import {
  NavbarTrigger,
  collapseNavbar,
} from "@/app/(state)/(slices)/navbar-slice";
import { Search, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  HomePageStatus,
  updateHomePageStatus,
} from "@/app/(state)/(slices)/home-page-slice";
import {
  themeHoverGradientLeftStop,
  themeHoverGradientRightStop,
} from "@/app/styles.module";
import { YTSearchResponse } from "@/app/yt-video-types";

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const globalSearchQuery = useAppSelector(
    (state) => state.searchReducer.value.searchQuery
  );

  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [oldSearchQuery, setOldSearchQuery] = useState("");

  useEffect(() => {
    setLocalSearchQuery(globalSearchQuery);
    handleOnChange(globalSearchQuery);
  }, [globalSearchQuery]);

  async function handleOnChange(newSearchQuery: string) {
    if (oldSearchQuery.toLowerCase() === newSearchQuery.trim().toLowerCase()) {
      setLocalSearchQuery(newSearchQuery);
      return;
    }

    if (newSearchQuery.trim() === "") {
      dispatch(updateSearchSuggestions([]));
      dispatch(updateSearchQuery(newSearchQuery));
      setLocalSearchQuery(newSearchQuery);
      return;
    }

    setLocalSearchQuery(newSearchQuery);
    setOldSearchQuery(newSearchQuery);
    dispatch(updateSearchQuery(newSearchQuery));

    debouncedCallback(newSearchQuery);
  }

  const debouncedCallback = useDebouncedCallback(
    (value) => {
      fetchSuggestions(value);
    },
    500,
    {
      leading: true,
      maxWait: 2000,
    }
  );

  async function fetchSuggestions(searchQuery: string) {
    // dispatch(
    //   updateSearchSuggestions(
    //     [
    //       "cats",
    //       "cats meowing",
    //       "cats eating",
    //       "cats funny",
    //       "cats fighting",
    //       "cats eating food",
    //       "cats funny videos",
    //       "cats shorts",
    //       "cats videos",
    //       "cats watching tv",
    //       "cats attacking",
    //       "cats funny moments",
    //       "cats loafing",
    //     ].filter((suggestion) =>
    //       suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    //     )
    //   )
    // );
    const response = await fetch("/api/suggestions", {
      method: "POST",
      body: JSON.stringify({ searchQuery: searchQuery }),
    });

    if (response.ok) {
      const body = await response.json();
      if (body.suggestions != undefined) {
        dispatch(updateSearchSuggestions(body.suggestions));
      }
    }
  }

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    const promises: Promise<YTSearchResponse | undefined>[] = [];
    try {
      promises.push(fetchVideos());
    } catch (error) {}

    Promise.all(promises).then((responses) => {
      if (responses != undefined) {
        responses.forEach((response) => {
          if (response != undefined) {
            dispatch(updateSearchSuggestions([]));
            dispatch(updateSearchResults(response.items));
            dispatch(updateNextPageToken(response.nextPageToken));
            dispatch(updateHomePageStatus(HomePageStatus.LoadingComplete));
          }
        });
      }
    });
  }

  async function fetchVideos(): Promise<YTSearchResponse | undefined> {
    dispatch(updateHomePageStatus(HomePageStatus.Loading));
    dispatch(collapseNavbar(NavbarTrigger.SearchButton));

    if (localSearchQuery.trim() != "") {
      const response = await fetch("/api/search-results", {
        method: "POST",
        body: JSON.stringify({ searchQuery: localSearchQuery }),
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
  }

  function clearSearchBar() {
    setLocalSearchQuery("");
    dispatch(updateSearchQuery(""));
    dispatch(updateSearchSuggestions([]));
    document.getElementById("search-bar")!.focus();
  }

  return (
    <div className="flex gap-2 w-full">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSearch}
        disabled={globalSearchQuery.trim().length === 0}
        id="append-suggestion"
        className={cn("flex-none", themeHoverGradientLeftStop)}
      >
        <Search className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <form onSubmit={handleSearch} className="grid w-full">
        <Input
          type="text"
          placeholder="Search..."
          value={localSearchQuery}
          onChange={(e) => handleOnChange(e.target.value)}
          id="search-bar"
          className={cn(
            `py-5 text-3xl flex-1 font-black bg-transparent border-none focus-visible:outline-none placeholder:text-white/50`
          )}
        />
      </form>
      <Button
        variant="ghost"
        size="icon"
        onClick={clearSearchBar}
        disabled={globalSearchQuery.trim().length === 0}
        id="append-suggestion"
        className={cn("flex-none", themeHoverGradientRightStop)}
      >
        <XCircle className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  );
};

export default SearchBar;
