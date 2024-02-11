"use client";

import { YTVideo } from "@/app/yt-video-types";
import { cn } from "@/lib/utils";
import VideoDescriptionBox from "./video-description-box";

const VideoDetails = ({ video }: { video: YTVideo }) => {
  return (
    <div id="video-details" className="grid gap-2 bg-red-300/20">
      <p className={cn("font-black text-lg")}>{video.snippet.title}</p>
      <p className={cn("font-black")}>{video.snippet.channelTitle}</p>
      <VideoDescriptionBox video={video} />
    </div>
  );
};

export default VideoDetails;
