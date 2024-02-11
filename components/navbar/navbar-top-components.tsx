"use client";

import Brand from "./brand";
import SearchButton from "../search/search-button";
import { ThemeToggle } from "../theme/theme-toggle";
import PlaylistButton from "../playlist/playlist-button";
import PlayPlaylistButton from "../playlist/play-playlist-button";

const NavbarTopComponents = () => {
  return (
    <div
      id="navbar-top-components"
      className="flex justify-between w-full h-[3rem]"
    >
      <Brand />
      <div className="flex items-center gap-2">
        <PlayPlaylistButton />
        <PlaylistButton />
        <SearchButton />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default NavbarTopComponents;
