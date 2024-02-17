"use client";

import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical, Play } from "lucide-react";
import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import { PlaylistVideo, YTVideoSearchResult } from "@/app/yt-video-types";
import { useDispatch } from "react-redux";
import { updatePlaylist } from "@/app/(state)/(slices)/playlist-slice";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { cn } from "@/lib/utils";
import {
  themeCardOnGradientBG,
  themeCardOnPlaneBG,
  themeGradientBackground,
  themeHoverGradientRightStop,
} from "@/app/styles.module";

const Playlist = ({ video }: { video: PlaylistVideo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const playlistVideos = useAppSelector(
    (state) => state.playlistReducer.value.videos
  );
  const currentVideoId = useAppSelector(
    (state) => state.watchPageReducer.value.currentVideoId
  );
  const { toast } = useToast();

  function handleOnClickRemoveFromPlaylist(
    e: React.MouseEvent,
    video: PlaylistVideo
  ) {
    e.stopPropagation();
    var videoRemoved = false;
    var videos: PlaylistVideo[] = [];
    playlistVideos.forEach((video) => videos.push(video));

    for (var i = 0; i < videos.length; i = i + 1) {
      if (videos[i].id === video.id) {
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
    <div
      key={video.id}
      className={cn(
        "grid grid-cols-3 gap-2 m-1 p-1 w-[90vw] md:w-[30vw] max-w-[480px] grow transition-all cursor-pointer",
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
          src={video.thumbnails.high.url}
          alt={video.title}
          className="rounded-md object-cover"
        />
      </AspectRatio>
      <div className="flex grow justify-between col-start-2 col-span-2">
        <div className="grid place-content-between">
          <p className="font-semibold line-clamp-2 text-sm">{video.title}</p>
          <p className="font-light text-xs">{video.channelTitle}</p>
        </div>
        <div className={`grid content-center`}>
          {currentVideoId === video.id ? (
            <Play className="p-1" />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical
                  className={cn("p-1 rounded-lg", themeHoverGradientRightStop)}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={(e: React.MouseEvent) =>
                    handleOnClickRemoveFromPlaylist(e, video)
                  }
                >
                  Remove from playlist
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
