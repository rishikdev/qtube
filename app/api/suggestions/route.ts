export async function POST(request: Request) {
  const body = await request.json();

  const apiUrl = `${process.env.YOUTUBE_SEARCH_SUGGESTIONS_API}&q=${body.searchQuery}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return new Response(
      JSON.stringify({
        suggestions: data[1],
      })
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error }));
  }
}
