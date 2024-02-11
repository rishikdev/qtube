"use client";

import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import PlaylistContainer from "../playlist/playlist-container";
import LazyYouTubeIframe from "./lazy-youtube-iframe";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { updateWatch } from "@/app/(state)/(slices)/watch-slice";
import { useDispatch } from "react-redux";
import dummyVideo from "@/app/sample-youtube-video-result.json";
import { YTVideo } from "@/app/yt-video-types";
import VideoSkeleton from "./video-skeleton";
import VideoDescriptionBox from "./video-description-box";
import VideoDetails from "./video-details";
import { themeGradientBackground } from "@/app/styles.module";

const WatchPage = ({ videoId }: { videoId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  var videos = useAppSelector((state) => state.watchReducer.value.videos);
  const sampleVideo = dummyVideo.items[0];

  useEffect(() => {
    // If this condition is true, then this page was reached directly by entering the URL
    if (videos[0].id === "") {
      // fetchVideo();
      setTimeout(() => {
        fetchDummyVideo();
      }, 2000);
    }
  }, []);

  function fetchDummyVideo() {
    dispatch(updateWatch([sampleVideo as YTVideo]));
  }

  async function fetchVideo() {
    const response = await fetch("/api/video", {
      method: "POST",
      body: JSON.stringify({ videoId: videoId }),
    });

    if (response.ok) {
      const body = await response.json();
      dispatch(updateWatch([body.video]));
    }
  }

  const [index, setIndex] = useState(0);

  return (
    <div
      id="watch-video-container"
      className="mx-4 mb-4 duration-500 ease-in-out transition-all "
    >
      <div className="grid md:flex gap-4 w-full">
        {videos != undefined && videos[0].id.length === 0 ? (
          <div className="md:w-2/3">
            <VideoSkeleton />
          </div>
        ) : (
          <div className="grid gap-1 md:w-2/3 aspect-video">
            <LazyYouTubeIframe
              videoId={videoId}
              title={videos[index].snippet.title}
            />
            <VideoDetails video={videos[index]} />
          </div>
        )}
        <div
          className={cn(
            "md:w-1/3 h-[90vh] overflow-visible rounded-lg",
            themeGradientBackground
          )}
        >
          <PlaylistContainer />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
