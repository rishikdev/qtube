"use client";

import { themeGradientText } from "@/app/styles.module";
import { cn } from "@/lib/utils";

const WatchPageError = () => {
  return (
    <div id="watch-video-error">
      <div className={cn("grid select-none cursor-default rounded-lg")}>
        <div className="m-auto p-10 drop-shadow-md">
          <div
            className={cn(
              "text-5xl font-black dark:brightness-150",
              themeGradientText
            )}
          >
            oh, no!
          </div>
          <div className={cn("text-xl")}>this video is not available</div>
        </div>
      </div>
    </div>
  );
};

export default WatchPageError;
