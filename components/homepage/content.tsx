"use client";

import { YTVideoSearchResult } from "@/app/yt-video-types";
import { cn } from "@/lib/utils";
import { themeCardOnPlaneBG } from "@/app/styles.module";
import ContentThumbnail from "./content-thumbnail";
import ContentDetails from "./content-details";
import ContentMoreButton from "./content-more-button";
import { useRef } from "react";

const Content = ({ content }: { content: YTVideoSearchResult }) => {
  return (
    <div
      key={content.id.videoId}
      id={`content-${content.id.videoId}`}
      className={cn(
        "flex flex-col p-1 w-full h-full max-w-[480px] max-h-[360px] transition-all z-40 cursor-pointer",
        themeCardOnPlaneBG
      )}
    >
      <ContentThumbnail content={content} />
      <div className="flex grow justify-between p-2">
        <ContentDetails content={content} />
        <ContentMoreButton content={content} />
      </div>
    </div>
  );
};

export default Content;
