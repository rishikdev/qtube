"use client";

import { themeGradientText } from "@/app/styles.module";
import { cn } from "@/lib/utils";

const EmptyPlaylistPage = ({ height }: { height: string }) => {
  return (
    <div className={cn("grid select-none cursor-default rounded-lg", height)}>
      <div className="m-auto p-10 drop-shadow-md">
        <div
          className={cn(
            "text-5xl font-black dark:brightness-150",
            themeGradientText
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
