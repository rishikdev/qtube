"use client";

import ytData from "@/app/sample-youtube-search-result.json";
import { ListVideo, X } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import {
  NavbarStatus,
  NavbarTrigger,
  collapseNavbar,
  expandNavbar,
} from "@/app/(state)/(slices)/navbar-slice";
import { cn } from "@/lib/utils";
import { themeHoverGradientRightStop } from "@/app/styles.module";

const PlaylistButton = () => {
  const videos = ytData.items;
  const dispatch = useDispatch<AppDispatch>();

  const navbarStatus = useAppSelector(
    (state) => state.navbarSliceReducer.value.navbarStatus
  );

  const navbarTrigger = useAppSelector(
    (state) => state.navbarSliceReducer.value.navbarTrigger
  );

  function handleOnClickShowPlaylist() {
    switch (navbarStatus) {
      case NavbarStatus.Collapsed: {
        dispatch(expandNavbar(NavbarTrigger.PlaylistButton));
        break;
      }

      case NavbarStatus.Expanded: {
        if (navbarTrigger === NavbarTrigger.PlaylistButton) {
          dispatch(collapseNavbar(NavbarTrigger.PlaylistButton));
        } else if (navbarTrigger === NavbarTrigger.SearchButton) {
          dispatch(expandNavbar(NavbarTrigger.PlaylistButton));
        }
      }
    }
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleOnClickShowPlaylist}
        id="search-button"
        className={cn("p-1", themeHoverGradientRightStop)}
      >
        {navbarStatus === NavbarStatus.Expanded &&
        navbarTrigger === NavbarTrigger.PlaylistButton ? (
          <X className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <ListVideo className="h-[1.2rem] w-[1.2rem]" />
        )}
      </Button>
    </div>
  );
};

export default PlaylistButton;
