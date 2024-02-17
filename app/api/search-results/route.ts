import { YTSearchResponse } from "@/app/yt-video-types";

export async function POST(request: Request) {
  const body = await request.json();
  var parameters: string = "";

  parameters = `&q=${body.searchQuery}`;

  if (body.nextPageToken != "") {
    parameters = parameters + `&pageToken=${body.nextPageToken}`;
  }
  const apiUrl = `${process.env.YOUTUBE_SEARCH_API}${parameters}`;
  console.log(apiUrl);

  try {
    const response = await fetch(apiUrl);
    const data = (await response.json()) as YTSearchResponse;
    console.log("API CALLED");
    return new Response(
      JSON.stringify({
        searchResults: data.items,
        nextPageToken: data.nextPageToken,
        totalresults: data.pageInfo.totalResults,
      })
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error }));
  }
}
