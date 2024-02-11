"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum NavbarStatus {
  Collapsed,
  Expanded,
}

export enum NavbarTrigger {
  Brand,
  SearchButton,
  PlaylistButton,
}

interface NavbarState {
  value: {
    navbarStatus: NavbarStatus;
    navbarTrigger: NavbarTrigger;
  };
}

const initialState: NavbarState = {
  value: {
    navbarStatus: NavbarStatus.Collapsed,
    navbarTrigger: NavbarTrigger.SearchButton,
  },
};

export const navbarSlice = createSlice({
  name: "navbarSlice",
  initialState,
  reducers: {
    expandNavbar: (state, trigger: PayloadAction<NavbarTrigger>) => {
      state.value.navbarStatus = NavbarStatus.Expanded;
      state.value.navbarTrigger = trigger.payload;

      const navbar = document.getElementById("navbar")!;
      navbar.classList.add("h-full");
      navbar.classList.remove("h-[3rem]");

      // Applying blur to the home page and making it non-scrollable
      const page =
        document.getElementById("home-page") ||
        document.getElementById("watch-page") ||
        document.getElementById("watch-video-page") ||
        document.getElementById("watch-video-container");
      page?.classList.add("blur-xl");

      const searchComponent = document.getElementById(
        "search-components-container"
      )!;
      const playlistComponent = document.getElementById(
        "navbar-playlist-container"
      )!;

      if (trigger.payload === NavbarTrigger.SearchButton) {
        searchComponent.classList.add("delay-300", "opacity-100", "visible");
        searchComponent.classList.remove(
          "opacity-0",
          "invisible",
          "delay-0",
          "hidden"
        );

        playlistComponent.classList.add("opacity-0", "invisible", "delay-0");
        playlistComponent.classList.remove(
          "delay-300",
          "opacity-100",
          "visible"
        );
      } else if (trigger.payload === NavbarTrigger.PlaylistButton) {
        playlistComponent.classList.add("delay-500", "opacity-100", "visible");
        playlistComponent.classList.remove("opacity-0", "invisible", "delay-0");

        searchComponent.classList.add(
          "opacity-0",
          "invisible",
          "delay-0",
          "hidden"
        );
        searchComponent.classList.remove("delay-300", "opacity-100", "visible");
      }
    },

    collapseNavbar: (state, trigger: PayloadAction<NavbarTrigger>) => {
      state.value.navbarStatus = NavbarStatus.Collapsed;
      state.value.navbarTrigger = trigger.payload;

      const navbar = document.getElementById("navbar")!;
      navbar.classList.add("h-[3rem]");
      navbar.classList.remove("h-full");

      // Removing blur from the home page and making it scrollable
      const page =
        document.getElementById("home-page") ||
        document.getElementById("watch-page") ||
        document.getElementById("watch-video-page") ||
        document.getElementById("watch-video-container");
      page?.classList.remove("blur-xl");

      const searchComponent = document.getElementById(
        "search-components-container"
      )!;
      const playlistComponent = document.getElementById(
        "navbar-playlist-container"
      )!;

      searchComponent.classList.add("opacity-0", "invisible", "delay-0");
      searchComponent.classList.remove(
        "delay-300",
        "opacity-100",
        "visible",
        "hidden"
      );

      playlistComponent.classList.add("opacity-0", "invisible", "delay-0");
      playlistComponent.classList.remove("delay-500", "opacity-100", "visible");
    },
  },
});

export const { expandNavbar, collapseNavbar: collapseNavbar } =
  navbarSlice.actions;

export default navbarSlice.reducer;
