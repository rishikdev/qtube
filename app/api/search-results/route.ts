import { YTSearchResponse } from "@/app/yt-video-types";

export async function POST(request: Request) {
  const body = await request.json();

  const apiUrl = `${process.env.YOUTUBE_SEARCH_API}&q=${body.searchQuery}`;

  try {
    const response = await fetch(apiUrl);
    const data = (await response.json()) as YTSearchResponse;
    return new Response(
      JSON.stringify({
        searchResults: data.items,
      })
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error }));
  }
}
