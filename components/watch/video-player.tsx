"use client";

import {
  WatchPageStatus,
  updateCurrentVideoId,
  updateWatchPageStatus,
} from "@/app/(state)/(slices)/watch-page-slice";
import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import { YTVideo } from "@/app/yt-video-types";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useDispatch } from "react-redux";
import YouTube from "react-youtube";

const VideoPlayer = ({ video }: { video: YTVideo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentVideoId = useAppSelector(
    (state) => state.watchPageReducer.value.currentVideoId
  );
  const playlistVideos = useAppSelector(
    (state) => state.playlistReducer.value.videos
  );

  const router = useRouter();

  const opts = {
    height: "full",
    width: "full",
    playerVars: {
      autoplay: 1,
    },
  };

  function handleOnEnd() {
    for (var i = 0; i < playlistVideos.length; i = i + 1) {
      if (
        playlistVideos[i].id === currentVideoId &&
        i != playlistVideos.length - 1
      ) {
        const nextVideoId = playlistVideos[i + 1].id;
        dispatch(updateCurrentVideoId(nextVideoId));
        dispatch(updateWatchPageStatus(WatchPageStatus.Loading));
        router.push(`/watch/${nextVideoId}`);
      }
    }
  }

  return (
    <div className="w-full">
      <YouTube
        className="video-player-aspect"
        videoId={video.id}
        title={video.snippet.title}
        opts={opts}
        onEnd={() => handleOnEnd()}
      />
    </div>
  );
};

export default VideoPlayer;
