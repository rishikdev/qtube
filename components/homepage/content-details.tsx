"use client";

import { YTVideoSearchResult } from "@/app/yt-video-types";

import { Suspense, useEffect, useState } from "react";
import getDateDifference from "@/app/date-difference";

const ContentDetails = ({ content }: { content: YTVideoSearchResult }) => {
  const hydrated = useHydration();

  function useHydration() {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
      setHydrated(true);
    }, []);
    return hydrated;
  }

  return (
    <div
      id={`content-details-container-${content.id.videoId}`}
      className="grid w-full gap-2 place-content-stretch"
    >
      <p
        id={`content-details-title-${content.id.videoId}`}
        className="font-semibold line-clamp-2"
      >
        {content.snippet.title}
      </p>
      <div
        id={`content-secondary-details-container-${content.id.videoId}`}
        className="flex justify-between"
      >
        <p
          id={`content-details-channel-title-${content.id.videoId}`}
          className="font-light text-sm grid content-end"
        >
          {content.snippet.channelTitle}
        </p>
        <div
          id={`content-details-published-date-${content.id.videoId}`}
          className="grid content-end"
        >
          <Suspense key={hydrated ? "local" : "utc"}>
            <time
              dateTime={new Date(content.snippet.publishedAt).toISOString()}
              className="font-light text-sm"
            >
              {getDateDifference(new Date(content.snippet.publishedAt))}
            </time>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;
