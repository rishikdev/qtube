"use client";

import { Skeleton } from "../ui/skeleton";

const VideoSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3 w-full aspect-video ">
      <Skeleton className="h-full w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
      </div>
    </div>
  );
};

export default VideoSkeleton;
