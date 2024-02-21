"use client";

import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import { YTVideoSearchResult } from "@/app/yt-video-types";
import { useDispatch } from "react-redux";
import Content from "./content";
import { updateCurrentVideoId } from "@/app/(state)/(slices)/watch-page-slice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  updateNextPageToken,
  updateSearchResults,
} from "@/app/(state)/(slices)/search-slice";

const ContentContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contents = useAppSelector(
    (state) => state.searchReducer.value.searchResults
  );
  const globalSearchQuery = useAppSelector(
    (state) => state.searchReducer.value.searchQuery
  );
  const nextPageToken = useAppSelector(
    (state) => state.searchReducer.value.nextPageToken
  );

  const [localContents, setLocalContents] = useState<YTVideoSearchResult[]>();
  const [pageBottomReached, setPageBottomReached] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setLocalContents(contents);
  }, [contents]);

  async function handleOnClickFetchVideo(contentId: string) {
    dispatch(updateCurrentVideoId(contentId));
    router.push(`/watch/${contentId}`);
  }

  async function handleEndOfRow() {
    const response = await fetch("/api/search-results", {
      method: "POST",
      body: JSON.stringify({
        searchQuery: globalSearchQuery,
        nextPageToken: nextPageToken,
      }),
    });

    if (response.ok) {
      const body = await response.json();
      var newContents: YTVideoSearchResult[] = [];
      var videoIds = new Set<string>();

      if (localContents != undefined) {
        localContents.forEach((content) => {
          videoIds.add(content.id.videoId);
          newContents.push(content);
        });
      }

      if (body.items != undefined) {
        body.items.forEach((newContent: YTVideoSearchResult) => {
          if (!videoIds.has(newContent.id.videoId)) {
            videoIds.add(newContent.id.videoId);
            newContents.push(newContent);
          }
        });
        dispatch(updateSearchResults(newContents));
        dispatch(updateNextPageToken(body.nextPageToken));
        setPageBottomReached(false);
      }
    }
  }

  window.onscroll = function () {
    if (
      !pageBottomReached &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 2
    ) {
      setPageBottomReached(true);
      handleEndOfRow();
    }
  };

  return (
    <div
      id="content-container"
      className="mt-[4rem] m-2 lg:mx-12 xl:mx-24 2xl:mx-36 3xl:mx-48 gap-4 xl:gap-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 justify-items-center"
    >
      {localContents != undefined &&
        localContents.map(
          (
            content: YTVideoSearchResult,
            index: number,
            row: YTVideoSearchResult[]
          ) => (
            <div
              className="grid w-full place-items-center"
              key={content.id.videoId}
              onClick={() => handleOnClickFetchVideo(content.id.videoId)}
            >
              <Content content={content} />
            </div>
          )
        )}
    </div>
  );
};

export default ContentContainer;
