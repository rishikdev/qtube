"use client";

import { themeGradientText } from "@/app/styles.module";
import { cn } from "@/lib/utils";

const PlaylistError = () => {
  return (
    <div id="playlist-error">
      <div className={cn("grid h[90%] select-none cursor-default rounded-lg")}>
        <div className="m-auto p-10 drop-shadow-md">
          <div
            className={cn(
              "text-5xl font-black dark:brightness-150",
              themeGradientText
            )}
          >
            oh, no!
          </div>
          <div className={cn("text-xl")}>the playlist could not be created</div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistError;
