"use client";

import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import PlaylistContainer from "../playlist/playlist-container";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  WatchPageStatus,
  updateIsVideoFetched,
  updateWatchPageStatus,
  updateWatchedVideos,
} from "@/app/(state)/(slices)/watch-page-slice";
import { useDispatch } from "react-redux";
import { PlaylistVideo, YTVideo } from "@/app/yt-video-types";
import VideoSkeleton from "./video-skeleton";
import {
  PlaylistStatus,
  updatePlaylist,
  updatePlaylistStatus,
} from "@/app/(state)/(slices)/playlist-slice";
import PlaylistSkeleton from "../playlist/playlist-skeleton";
import WatchPageSuccess from "./watch-page-success";
import WatchPageError from "./watch-page-error";
import PlaylistError from "../playlist/playlist-error";

const WatchPage = ({ videoIds }: { videoIds: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const watchedVideos = useAppSelector(
    (state) => state.watchPageReducer.value.watchedVideos
  );
  const playlistVideos = useAppSelector(
    (state) => state.playlistReducer.value.videos
  );
  const playlistStatus = useAppSelector(
    (state) => state.playlistReducer.value.playlistStatus
  );
  const watchPageStatus = useAppSelector(
    (state) => state.watchPageReducer.value.watchPageStatus
  );
  const currentVideoId = useAppSelector(
    (state) => state.watchPageReducer.value.currentVideoId
  );
  const [currentVideo, setCurrentVideo] = useState<YTVideo>();

  useEffect(() => {
    var ids = decodeURIComponent(videoIds).split(",");
    populateWatchPage(ids[0]);
    populatePlaylist(ids);
  }, [currentVideoId]);

  async function fetchVideo(videoId: string): Promise<YTVideo> {
    const response = await fetch("/api/video", {
      method: "POST",
      body: JSON.stringify({ videoId: videoId }),
    });
    if (response.ok) {
      const body = await response.json();
      if (body.video != undefined) {
        return body.video;
      } else {
        throw Error(body.error);
      }
    } else {
      throw Error("Server error");
    }
  }

  async function populateWatchPage(videoIdFromUrl: string) {
    dispatch(updateWatchPageStatus(WatchPageStatus.Loading));
    var videoExistsInWatchedVideos: Boolean = false;
    var watchedVideosLocal: YTVideo[] = [];
    const videoId = currentVideoId || videoIdFromUrl; // currentVideoId will be empty when the watch-page is reached directly from the url

    watchedVideos.forEach((watchedVideo: YTVideo) => {
      watchedVideosLocal.push(watchedVideo);
      if (videoId === watchedVideo.id) {
        videoExistsInWatchedVideos = true;
        dispatch(updateWatchPageStatus(WatchPageStatus.LoadComplete));
        setCurrentVideo(watchedVideo);
      }
    });

    if (!videoExistsInWatchedVideos) {
      try {
        const video: YTVideo = await fetchVideo(videoId);
        setCurrentVideo(video);
        watchedVideosLocal.push(video);
        dispatch(updateWatchedVideos(watchedVideosLocal));
        dispatch(updateWatchPageStatus(WatchPageStatus.LoadComplete));
      } catch (error) {
        dispatch(updateWatchPageStatus(WatchPageStatus.ErrorEncountered));
      }
    }
  }

  async function populatePlaylist(videoIds: string[]) {
    if (videoIds.length < 2 || playlistVideos.length != 0) {
      dispatch(updatePlaylistStatus(PlaylistStatus.LoadComplete));
      return;
    }

    var playlistErrorEncountered: Boolean = false;
    var videoExistsInPlaylist: Boolean = false;
    var videos: PlaylistVideo[] = [];
    playlistVideos.forEach((video: PlaylistVideo) => videos.push(video));
    const promises: Promise<YTVideo>[] = [];

    videoIds.forEach((videoId: string) => {
      for (var i = 0; i < videos.length; i = i + 1) {
        if (videos[i].id === videoId) {
          videoExistsInPlaylist = true;
          break;
        }
      }

      if (!videoExistsInPlaylist) {
        try {
          promises.push(fetchVideo(videoId));
        } catch (error) {
          playlistErrorEncountered = true;
        }
      }
    });

    Promise.all(promises).then((fetchedVideos) => {
      fetchedVideos.forEach((fetchedVideo: YTVideo) => {
        const video: YTVideo = fetchedVideo;
        const videoToAdd: PlaylistVideo = {
          id: video.id,
          title: video.snippet.title,
          channelTitle: video.snippet.channelTitle,
          thumbnails: video.snippet.thumbnails,
        };
        videos.push(videoToAdd);
      });
      if (!playlistErrorEncountered) {
        dispatch(updatePlaylist(videos));
        dispatch(updatePlaylistStatus(PlaylistStatus.LoadComplete));
      } else {
        dispatch(updatePlaylistStatus(PlaylistStatus.ErrorEncountered));
      }
    });
  }

  return (
    <div
      id="watch-video-container"
      className="mx-4 mb-4 duration-500 ease-in-out transition-all "
    >
      <div className="grid md:flex gap-4 w-full">
        <div className="md:w-2/3">
          {watchPageStatus === WatchPageStatus.Loading ? (
            <VideoSkeleton />
          ) : watchPageStatus === WatchPageStatus.LoadComplete &&
            currentVideo != undefined ? (
            <WatchPageSuccess video={currentVideo!} />
          ) : (
            <WatchPageError />
          )}
        </div>

        <div
          className={cn("md:w-1/3 md:h-[90vh] overflow-y-visible rounded-lg")}
        >
          {playlistStatus === PlaylistStatus.Loading ? (
            <PlaylistSkeleton />
          ) : playlistStatus === PlaylistStatus.LoadComplete ? (
            <PlaylistContainer
              height=""
              overflowBehaviour="overflow-y-visible md:overflow-y-scroll"
            />
          ) : (
            <PlaylistError />
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
