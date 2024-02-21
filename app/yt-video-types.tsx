export type YTSearchResponse = {
  nextPageToken: string;
  items: [YTVideoSearchResult];
};

export type YTVideoResponse = {
  items: [YTVideo];
};

export type YTVideoSearchResult = {
  id: {
    kind: string;
    videoId: string;
  };

  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
  };
};

export type YTVideo = {
  kind: string;
  id: string;

  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
  };

  statistics: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
};

export type PlaylistVideo = {
  id: string;
  title: string;
  channelTitle: string;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
  };
};
