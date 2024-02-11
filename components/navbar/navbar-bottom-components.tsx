"use client";

import NavbarPlaylistContainer from "./navbar-playlist-container";
import SearchComponentsContainer from "../search/search-components-container";
import { useAppSelector } from "@/app/(state)/store";

const NavbarBottomComponents = () => {
  const playlistVideos = useAppSelector(
    (state) => state.playlistReducer.value.videos
  );
  return (
    <div
      id="navbar-bottom-components"
      className={`py-0 ${
        playlistVideos.length === 0 ? `h-full` : `h-[90%]`
      } w-full transition-all ease-in-out`}
    >
      <SearchComponentsContainer />
      <NavbarPlaylistContainer />
    </div>
  );
};

export default NavbarBottomComponents;
