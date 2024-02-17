"use client";

import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import {
  PlaylistVideo,
  YTVideo,
  YTVideoSearchResult,
} from "@/app/yt-video-types";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useDispatch } from "react-redux";
import {
  PlaylistStatus,
  updatePlaylist,
  updatePlaylistStatus,
} from "@/app/(state)/(slices)/playlist-slice";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { cn } from "@/lib/utils";
import { themeHoverGradientRightStop } from "@/app/styles.module";

const ContentMoreButton = ({ content }: { content: YTVideoSearchResult }) => {
  const dispatch = useDispatch<AppDispatch>();

  const playlistVideos = useAppSelector(
    (state) => state.playlistReducer.value.videos
  );

  const { toast } = useToast();

  function handleOnClickAddToPlaylist(
    e: React.MouseEvent,
    video: YTVideoSearchResult
  ) {
    e.stopPropagation();
    var videoExists = false;
    var videos: PlaylistVideo[] = [];
    playlistVideos.forEach((video: PlaylistVideo) => videos.push(video));

    for (var i = 0; i < videos.length; i = i + 1) {
      if (videos[i].id === video.id.videoId) {
        showToast(
          "Something's not right",
          "Video already exists in the playlist"
        );
        videoExists = true;
        break;
      }
    }

    if (!videoExists) {
      const videoToAdd: PlaylistVideo = {
        id: video.id.videoId,
        title: video.snippet.title,
        channelTitle: video.snippet.channelTitle,
        thumbnails: video.snippet.thumbnails,
      };
      videos.push(videoToAdd);
      dispatch(updatePlaylist(videos));
      showToast("Success!", "Video has been added to the playlist");
    }
  }

  function handleOnClickVisitChannel(
    e: React.MouseEvent,
    video: YTVideoSearchResult
  ) {
    e.stopPropagation();
  }

  function showToast(title: string, description: string) {
    toast({
      title: title,
      description: description,
      action: <ToastAction altText="Dismiss toast">Dismiss</ToastAction>,
    });
  }

  return (
    <div id="button-more-container" className="grid flex-none content-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical
            id="button-more"
            className={cn("p-1 rounded-lg", themeHoverGradientRightStop)}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            id={`content-more-add-to-playlist-${content.id}`}
            onClick={(e) => handleOnClickAddToPlaylist(e, content)}
          >
            Add to playlist
          </DropdownMenuItem>
          <DropdownMenuItem
            id={`content-more-visit-channel-${content.id}`}
            onClick={(e) => handleOnClickVisitChannel(e, content)}
          >
            Visit channel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ContentMoreButton;
