"use client";

import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import ytData from "@/app/sample-youtube-search-result.json";
import { YTVideo, YTVideoSearchResult } from "@/app/yt-video-types";
import { useDispatch } from "react-redux";
import Content from "./content";
import Link from "next/link";
import { updateWatch } from "@/app/(state)/(slices)/watch-slice";

const ContentContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const contents = useAppSelector(
  //   (state) => state.searchReducer.value.searchResults
  // );

  const contents = ytData.items;

  async function handleOnClickFetchVideo(content: YTVideoSearchResult) {
    const response = await fetch("/api/video", {
      method: "POST",
      body: JSON.stringify({ videoId: content.id.videoId }),
    });

    if (response.ok) {
      const body = await response.json();
      dispatch(updateWatch([body.video]));
    }
  }

  return (
    <div
      id="content-container"
      className="mt-[4rem] m-2 lg:mx-12 xl:mx-24 2xl:mx-36 3xl:mx-48 gap-4 xl:gap-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 justify-items-center"
    >
      {contents.map((content: YTVideoSearchResult) => (
        <Link
          className="grid w-full place-items-center"
          key={content.id.videoId}
          href={`/watch/${content.id.videoId}`}
          onClick={() => handleOnClickFetchVideo(content)}
        >
          <Content content={content} />
        </Link>
      ))}
    </div>
  );
};

export default ContentContainer;
