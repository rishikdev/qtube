"use client";

import getDateDifference from "@/app/date-difference";
import { YTVideo } from "@/app/yt-video-types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  themeCardOnGradientBG,
  themeCardOnPlaneBG,
  themeHoverGradientLeftStop,
  themeHoverGradientRightStop,
} from "@/app/styles.module";

const VideoDescriptionBox = ({ video }: { video: YTVideo }) => {
  const hydrated = useHydration();

  const [showFullDescription, setShowFullDescription] = useState(false);

  function useHydration() {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
      setHydrated(true);
    }, []);
    return hydrated;
  }

  function humanReadableCount(countString: string, parameter: string): string {
    var isConversionSuccessful = false;
    var viewCountHumanReadable = "";
    try {
      const count = Number(countString);
      viewCountHumanReadable =
        Intl.NumberFormat(navigator.language, {
          notation: "compact",
        }).format(count) + (count > 1 ? ` ${parameter}s` : ` ${parameter}`);
      isConversionSuccessful = true;
    } catch {
      console.log("Could not convert view count");
      viewCountHumanReadable = "no views";
    } finally {
      return viewCountHumanReadable;
    }
  }

  return (
    <div
      id="video-description-box"
      className={cn("grid gap-2 p-2 rounded-lg", themeCardOnGradientBG)}
    >
      <div className="flex gap-3 text-xs font-bold justify-between">
        <p id="video-view-count" className="self-center">
          {humanReadableCount(video.statistics.viewCount, "view")}
        </p>
        <p id="video-like-count" className="self-center">
          {humanReadableCount(video.statistics.likeCount, "like")}
        </p>
        <Suspense key={hydrated ? "local" : "utc"}>
          <time
            // dateTime={new Date(video.snippet.publishedAt).toISOString()}
            className="self-center"
          >
            {getDateDifference(new Date(video.snippet.publishedAt))}
          </time>
        </Suspense>
        <Button
          variant="ghost"
          size="icon"
          className={cn("p-1", themeHoverGradientRightStop)}
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          {showFullDescription ? (
            <ChevronUp className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <ChevronDown className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </div>
      <p
        className={`text-sm whitespace-pre-line overflow-y-scroll ${
          showFullDescription && video.snippet.description.length != 0
            ? "flex"
            : "hidden"
        }`}
      >
        {video.snippet.description}
      </p>
    </div>
  );
};

export default VideoDescriptionBox;
