"use client";

import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import Playlist from "./playlist";
import EmptyPlaylistPage from "./empty-playlist-page";
import { themeGradientText } from "@/app/styles.module";
import { cn } from "@/lib/utils";
import { PlaylistVideo } from "@/app/yt-video-types";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  WatchPageStatus,
  updateCurrentVideoId,
  updateWatchPageStatus,
} from "@/app/(state)/(slices)/watch-page-slice";
import {
  NavbarTrigger,
  collapseNavbar,
} from "@/app/(state)/(slices)/navbar-slice";

const PlaylistContainer = ({
  height,
  overflowBehaviour,
}: {
  height: string;
  overflowBehaviour: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const playlistVideos = useAppSelector(
    (state) => state.playlistReducer.value.videos
  );
  const currentVideoId = useAppSelector(
    (state) => state.watchPageReducer.value.currentVideoId
  );
  const router = useRouter();

  function handleOnClickPlayVideo(videoId: string) {
    dispatch(updateCurrentVideoId(videoId));
    dispatch(updateWatchPageStatus(WatchPageStatus.Loading));
    dispatch(collapseNavbar(NavbarTrigger.PlaylistButton));
    router.push(`/watch/${videoId}`);
  }

  return (
    <div id="playlist-container" className={cn("h-full w-full")}>
      {playlistVideos.length === 0 ? (
        <EmptyPlaylistPage height={height} />
      ) : (
        <div id="playlist" className="grid content-start h-full">
          <div
            className={cn(
              "p-1 text-center drop-shadow-md cursor-default select-none"
            )}
          >
            <div className={cn("text-2xl font-black ", themeGradientText)}>
              your playlist
            </div>
          </div>
          <div className={cn("mb-1 h-full", overflowBehaviour)}>
            {playlistVideos.map((video: PlaylistVideo) => (
              <div
                key={video.id}
                className="grid place-content-center"
                onClick={() =>
                  currentVideoId === video.id
                    ? {}
                    : handleOnClickPlayVideo(video.id)
                }
              >
                <Playlist video={video} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistContainer;
