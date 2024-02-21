"use client";

import { Skeleton } from "../ui/skeleton";

const HomePageSkeleton = () => {
  return (
    <div className="mt-[4rem] m-2 lg:mx-12 xl:mx-24 2xl:mx-36 3xl:mx-48 gap-4 xl:gap-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 justify-items-center">
      <div className="grid space-y-2 h-full w-full max-w-[480px] max-h-[360px]">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-1/3" />
      </div>

      <div className="grid space-y-2 h-full w-full max-w-[480px] max-h-[360px]">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-1/3" />
      </div>

      <div className="grid space-y-2 h-full w-full max-w-[480px] max-h-[360px]">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-1/3" />
      </div>

      <div className="grid space-y-2 h-full w-full max-w-[480px] max-h-[360px]">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-1/3" />
      </div>

      <div className="grid space-y-2 h-full w-full max-w-[480px] max-h-[360px]">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-1/3" />
      </div>

      <div className="grid space-y-2 h-full w-full max-w-[480px] max-h-[360px]">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-1/3" />
      </div>
    </div>
  );
};

export default HomePageSkeleton;
