"use client";

import { Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import {
  NavbarStatus,
  NavbarTrigger,
  collapseNavbar,
  expandNavbar,
} from "@/app/(state)/(slices)/navbar-slice";
import { themeHoverGradientRightStop } from "@/app/styles.module";
import { cn } from "@/lib/utils";

const SearchButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navbarStatus = useAppSelector(
    (state) => state.navbarSliceReducer.value.navbarStatus
  );

  const navbarTrigger = useAppSelector(
    (state) => state.navbarSliceReducer.value.navbarTrigger
  );

  function handleOnClick() {
    switch (navbarStatus) {
      case NavbarStatus.Collapsed: {
        dispatch(expandNavbar(NavbarTrigger.SearchButton));
        document.getElementById("search-bar")!.focus();
        break;
      }

      case NavbarStatus.Expanded: {
        if (navbarTrigger === NavbarTrigger.SearchButton) {
          dispatch(collapseNavbar(NavbarTrigger.SearchButton));
        } else if (navbarTrigger === NavbarTrigger.PlaylistButton) {
          dispatch(expandNavbar(NavbarTrigger.SearchButton));
        }
        break;
      }
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        id="search-button"
        className={cn("p-1", themeHoverGradientRightStop)}
        onClick={handleOnClick}
      >
        {navbarStatus === NavbarStatus.Expanded &&
        navbarTrigger === NavbarTrigger.SearchButton ? (
          <X className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Search className="h-[1.2rem] w-[1.2rem]" />
        )}
      </Button>
    </>
  );
};

export default SearchButton;
