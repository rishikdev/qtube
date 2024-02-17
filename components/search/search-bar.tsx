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
  updateTotalResults,
} from "@/app/(state)/(slices)/search-slice";
import {
  NavbarTrigger,
  collapseNavbar,
} from "@/app/(state)/(slices)/navbar-slice";
import { Search, SearchCheck, X, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { updateHomePageStatus } from "@/app/(state)/(slices)/home-page-slice";
import {
  themeHoverGradientLeftStop,
  themeHoverGradientRightStop,
} from "@/app/styles.module";

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
      dispatch(updateSearchSuggestions(body.suggestions));
    } else {
      // HANDLE THIS CASE
    }
  }

  async function fetchVideos(e: FormEvent) {
    e.preventDefault();
    if (localSearchQuery.trim() === "") {
      return;
    }

    const response = await fetch("/api/search-results", {
      method: "POST",
      body: JSON.stringify({ searchQuery: localSearchQuery }),
    });

    if (response.ok) {
      const body = await response.json();
      dispatch(updateSearchResults(body.searchResults));
      dispatch(updateNextPageToken(body.nextPageToken));
      dispatch(updateTotalResults(body.totalResults));
      dispatch(updateSearchSuggestions([]));
      dispatch(collapseNavbar(NavbarTrigger.SearchButton));
      dispatch(updateHomePageStatus());
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
        onClick={fetchVideos}
        disabled={globalSearchQuery.trim().length === 0}
        id="append-suggestion"
        className={cn("flex-none", themeHoverGradientLeftStop)}
      >
        <Search className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <form onSubmit={fetchVideos} className="grid w-full">
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
