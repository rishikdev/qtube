import { YTSearchResponse } from "@/app/yt-video-types";
import data from "@/app/sample-youtube-search-result.json";

export async function POST(request: Request) {
  const body = await request.json();
  var parameters: string = "";

  parameters = `q=${body.searchQuery}`;

  if (body.nextPageToken != undefined && body.nextPageToken != "") {
    parameters = parameters + `&pageToken=${body.nextPageToken}`;
  }
  const apiUrl = `${process.env.YOUTUBE_SEARCH_API}&${parameters}&key=${process.env.YOUTUBE_API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    const data = (await response.json()) as YTSearchResponse;
    return new Response(
      JSON.stringify({
        items: data.items,
        nextPageToken: data.nextPageToken,
      })
    );
  } catch (error) {
    console.log("error:", error);
    return new Response(JSON.stringify({ error: error }));
  }
}
