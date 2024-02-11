"use client";

import PlaylistContainer from "../playlist/playlist-container";

const NavbarPlaylistContainer = () => {
  return (
    <div
      id="navbar-playlist-container"
      className="h-full w-full invisible opacity-0"
    >
      <PlaylistContainer />
    </div>
  );
};

export default NavbarPlaylistContainer;
