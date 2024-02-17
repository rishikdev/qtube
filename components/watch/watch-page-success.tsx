"use client";

import { YTVideo } from "@/app/yt-video-types";
import VideoDetails from "./video-details";
import VideoPlayer from "./video-player";

const WatchPageSuccess = ({ video }: { video: YTVideo }) => {
  return (
    <div id="watch-video-success">
      <div className="grid gap-1 content-start">
        <VideoPlayer video={video} />
        <VideoDetails video={video} />
      </div>
    </div>
  );
};

export default WatchPageSuccess;
