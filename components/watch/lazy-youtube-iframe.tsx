import React, { useState, useEffect, useRef } from "react";

import YouTubeIframe from "@/components/watch/youtube-iframe"; // Import your component
import VideoSkeleton from "./video-skeleton";

const LazyYouTubeIframe: React.FC<{ videoId: string; title: string }> = ({
  videoId,
  title,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setIsVisible(entries[0].isIntersecting);
    });
    observer.observe(videoRef.current!);
    return () => {
      if (videoRef.current) {
        // Ensure videoRef.current exists
        observer.unobserve(videoRef.current!);
      }
    };
  }, []);

  return (
    <div ref={videoRef}>
      {isVisible ? (
        <YouTubeIframe videoId={videoId} title={title} />
      ) : (
        <VideoSkeleton />
      )}
    </div>
  );
};

export default LazyYouTubeIframe;
