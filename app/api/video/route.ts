import { YTVideo, YTVideoResponse } from "@/app/yt-video-types";

export async function POST(request: Request) {
  const body = await request.json();

  const apiUrl = `${process.env.YOUTUBE_VIDEO_API}&id=${body.videoId}&key=${process.env.YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = (await response.json()) as YTVideoResponse;
    return new Response(
      JSON.stringify({
        video: data.items[0],
      })
    );
  } catch (error) {
    console.log("error:", error);
    return new Response(JSON.stringify({ error: error }));
  }
}
