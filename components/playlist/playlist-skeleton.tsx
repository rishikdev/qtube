"use client";

import { Skeleton } from "../ui/skeleton";

const PlaylistSkeleton = () => {
  return (
    <div className="grid gap-2">
      <Skeleton className="h-6 w-full rounded-lg" />

      <div className="grid grid-rows-3 grid-flow-col gap-2 h-24 w-full repeat-1">
        <Skeleton className="row-span-3 rounded-lg" />
        <Skeleton className="row-span-2 col-span-2" />
        <Skeleton className="col-span-2" />
      </div>

      <div className="grid grid-rows-3 grid-flow-col gap-2 h-24 w-full repeat-1">
        <Skeleton className="row-span-3 rounded-lg" />
        <Skeleton className="row-span-2 col-span-2" />
        <Skeleton className="col-span-2" />
      </div>
    </div>
  );
};

export default PlaylistSkeleton;
