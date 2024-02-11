"use client";

import { cn } from "@/lib/utils";

const EmptyPlaylistPage = () => {
  const gradientText =
    "inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text";
  return (
    <div className="grid h-[90%] select-none cursor-default">
      <div className="m-auto p-10 drop-shadow-md">
        <div
          className={cn(
            "text-5xl font-black dark:brightness-150",
            gradientText
          )}
        >
          hmmm...
        </div>
        <div className={cn("text-xl")}>your playlist is currently empty</div>
      </div>
    </div>
  );
};

export default EmptyPlaylistPage;
