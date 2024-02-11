import React, { FC } from "react";

interface YouTubeIframeProps {
  videoId: string;
  title: string;
  width?: number;
  height?: number;
  // Add other optional props for customization, like autoplay, controls, etc.
}

const YouTubeIframe: FC<YouTubeIframeProps> = ({
  videoId,
  width,
  height,
  title,
  ...otherProps
}) => {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      className="w-full aspect-video rounded-lg"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      {...otherProps}
    />
  );
};

export default YouTubeIframe;
