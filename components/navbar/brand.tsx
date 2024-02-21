"use client";

import {
  HomePageStatus,
  updateHomePageStatus,
} from "@/app/(state)/(slices)/home-page-slice";
import {
  updateNextPageToken,
  updateSearchResults,
} from "@/app/(state)/(slices)/search-slice";
import { AppDispatch } from "@/app/(state)/store";
import { themeHoverGradientLeftStop } from "@/app/styles.module";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  NavbarTrigger,
  collapseNavbar,
} from "@/app/(state)/(slices)/navbar-slice";
import { YTSearchResponse } from "@/app/yt-video-types";

const Brand = () => {
  const dispatch = useDispatch<AppDispatch>();

  async function handleSearch() {
    const promises: Promise<YTSearchResponse | undefined>[] = [];
    try {
      promises.push(loadHomePage());
    } catch (error) {}

    Promise.all(promises).then((responses) => {
      if (responses != undefined) {
        responses.forEach((response) => {
          if (response != undefined) {
            dispatch(updateSearchResults(response.items));
            dispatch(updateNextPageToken(response.nextPageToken));
            dispatch(updateHomePageStatus(HomePageStatus.LoadingComplete));
          }
        });
      }
    });
  }

  async function loadHomePage(): Promise<YTSearchResponse | undefined> {
    dispatch(updateHomePageStatus(HomePageStatus.Loading));
    dispatch(collapseNavbar(NavbarTrigger.Brand));

    const response = await fetch("/api/search-results", {
      method: "POST",
      body: JSON.stringify({ searchQuery: "", nextPageToken: "" }),
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

  return (
    <Button
      asChild
      variant="ghost"
      onClick={handleSearch}
      className={cn(
        "m-1 transition-all cursor-pointer",
        themeHoverGradientLeftStop
      )}
    >
      <Link href="/" className="font-light">
        QTube
      </Link>
    </Button>
  );
};

export default Brand;
