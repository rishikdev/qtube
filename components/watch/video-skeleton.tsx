"use client";

import { Skeleton } from "../ui/skeleton";

const VideoSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3 w-full aspect-video">
      <Skeleton className="h-full w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
};

export default VideoSkeleton;
