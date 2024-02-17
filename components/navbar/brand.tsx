"use client";

import { updateHomePageStatus } from "@/app/(state)/(slices)/home-page-slice";
import {
  updateNextPageToken,
  updateSearchResults,
  updateTotalResults,
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

const Brand = () => {
  const dispatch = useDispatch<AppDispatch>();

  async function loadHomePage() {
    const response = await fetch("/api/search-results", {
      method: "POST",
      body: JSON.stringify({ searchQuery: "", nextPageToken: "" }),
    });
    if (response.ok) {
      const body = await response.json();
      dispatch(updateSearchResults(body.searchResults));
      dispatch(updateNextPageToken(body.nextPageToken));
      dispatch(updateTotalResults(body.totalResults));
      dispatch(updateHomePageStatus());
      dispatch(collapseNavbar(NavbarTrigger.Brand));
    }
  }

  return (
    <Button
      asChild
      variant="ghost"
      onClick={loadHomePage}
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
