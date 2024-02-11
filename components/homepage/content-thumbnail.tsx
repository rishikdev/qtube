"use client";

import { YTVideoSearchResult } from "@/app/yt-video-types";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

const ContentThumbnail = ({ content }: { content: YTVideoSearchResult }) => {
  return (
    <AspectRatio
      ratio={16 / 9}
      id={`content-thumbnail-aspect-ratio-${content.id.videoId}`}
      className="flex-none"
    >
      <Image
        fill
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={content.snippet.thumbnails.high.url}
        alt={content.snippet.title}
        id={`content-thumbnail-image-${content.id.videoId}`}
        className="rounded-md object-cover"
      />
    </AspectRatio>
  );
};

export default ContentThumbnail;
