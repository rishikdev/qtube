"use client";

import ytData from "@/app/sample-youtube-search-result.json";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import { YTVideoSearchResult } from "@/app/yt-video-types";
import { useDispatch } from "react-redux";
import { updatePlaylist } from "@/app/(state)/(slices)/playlist-slice";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { cn } from "@/lib/utils";
import {
  themeCardOnGradientBG,
  themeHoverGradientRightStop,
} from "@/app/styles.module";

const Playlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const playlistVideos = useAppSelector(
  //   (state) => state.playlistReducer.value.videos
  // );

  const playlistVideos = ytData.items;

  const { toast } = useToast();

  function handleOnClickRemoveFromPlaylist(video: YTVideoSearchResult) {
    var videoRemoved = false;
    var videos: YTVideoSearchResult[] = [];
    playlistVideos.forEach((video) => videos.push(video));

    for (var i = 0; i < videos.length; i = i + 1) {
      if (videos[i].id.videoId === video.id.videoId) {
        videos.splice(i, 1);
        videoRemoved = true;
        dispatch(updatePlaylist(videos));
        showToast("Success!", "Video has been removed from the playlist");
        break;
      }
    }

    if (!videoRemoved) {
      showToast("Aw, snap!", "Video could not be removed from the playlist");
    }
  }

  function showToast(title: string, description: string) {
    toast({
      title: title,
      description: description,
      action: <ToastAction altText="Dismiss toast">Dismiss</ToastAction>,
    });
  }

  return (
    <div className="grid place-content-center">
      {playlistVideos.map((video) => (
        <div
          key={video.id.videoId}
          className={cn(
            "grid grid-cols-3 gap-2 m-1 p-1 max-w-[480px] transition-all cursor-pointer",
            themeCardOnGradientBG
          )}
        >
          <AspectRatio
            ratio={16 / 9}
            className="flex-none col-start-1 col-span-1 overflow-hidden"
          >
            <Image
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              className="rounded-md object-cover"
            />
          </AspectRatio>
          <div className="flex grow justify-between col-start-2 col-span-2">
            <div className="grid place-content-between">
              <p className="font-semibold line-clamp-2 text-sm">
                {video.snippet.title}
              </p>
              <p className="font-light text-xs">{video.snippet.channelTitle}</p>
            </div>
            <div className="grid content-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical
                    className={cn(
                      "p-1 rounded-lg",
                      themeHoverGradientRightStop
                    )}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleOnClickRemoveFromPlaylist(video)}
                  >
                    Remove from playlist
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
