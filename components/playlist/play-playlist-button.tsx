"use client";

import { Play } from "lucide-react";
import { Button } from "../ui/button";
import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import { themeHoverGradientRightStop } from "@/app/styles.module";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import ytData from "@/app/sample-youtube-search-result.json";
import { updatePlaylist } from "@/app/(state)/(slices)/playlist-slice";

const PlayPlaylistButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const playlistVideos = useAppSelector(
    (state) => state.playlistReducer.value.videos
  );

  function handleOnClickPlayPlaylist() {
    dispatch(updatePlaylist(playlistVideos.length === 0 ? ytData.items : []));
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        // disabled={playlistVideos.length === 0}
        onClick={() => handleOnClickPlayPlaylist()}
        id="play-playlist-button"
        className={cn("p-1", themeHoverGradientRightStop)}
      >
        <Play className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  );
};

export default PlayPlaylistButton;
