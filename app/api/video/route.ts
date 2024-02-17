import { YTVideo, YTVideoResponse } from "@/app/yt-video-types";
import sampleYtData from "@/app/sample-youtube-video-result.json";

export async function POST(request: Request) {
  const body = await request.json();

  const apiUrl = `${process.env.YOUTUBE_VIDEO_API}&id=${body.videoId}`;

  try {
    const response = await fetch(apiUrl);
    const data = (await response.json()) as YTVideoResponse;
    console.log("API CALL");
    return new Response(
      JSON.stringify({
        video: data.items[0],
        // video: sampleYtData.items[0],
      })
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error }));
  }
}
