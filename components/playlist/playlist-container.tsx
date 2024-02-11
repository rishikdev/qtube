"use client";

import ytData from "@/app/sample-youtube-search-result.json";
import { useAppSelector } from "@/app/(state)/store";
import Playlist from "./playlist";
import EmptyPlaylistPage from "./empty-playlist-page";
import {
  themeCardOnGradientBG,
  themeCardOnPlaneBG,
  themeGradientText,
} from "@/app/styles.module";
import { cn } from "@/lib/utils";

const PlaylistContainer = () => {
  const playlistVideos = useAppSelector(
    (state) => state.playlistReducer.value.videos
  );

  // const playlistVideos = ytData.items;

  return (
    <div id="playlist-container" className="h-full w-full">
      {playlistVideos.length === 0 ? (
        <EmptyPlaylistPage />
      ) : (
        <div id="playlist" className="grid place-content-center h-full">
          <div
            className={cn(
              "m-1 p-1 text-center drop-shadow-md",
              themeCardOnGradientBG
            )}
          >
            <div className={cn("text-2xl font-black", themeGradientText)}>
              your playlist
            </div>
          </div>
          <div className="h-full overflow-scroll">
            <Playlist />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistContainer;
