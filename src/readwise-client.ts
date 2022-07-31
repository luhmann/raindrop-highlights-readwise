const AUTH_TOKEN = Deno.env.get("READWISE_API_TOKEN");

if (typeof AUTH_TOKEN === "undefined") {
  throw new Error("READWISE_API_TOKEN is not set");
}

export type ReadwiseHighlight = {
  text: string;
  title: string | null;
  author: string | null;
  source_url: string;
  highlighted_at: string; // TODO: possible to narrow type to date format?
  category: "articles";
  color: "red" | "yellow" | "green" | "blue";
};

export const saveHighlights = (highlights: ReadwiseHighlight[]) =>
  basePostRequest("/highlights", {
    method: "POST",
    body: JSON.stringify({ highlights }),
  });

const basePostRequest = async (
  url: string,
  options: Record<string, unknown>
) => {
  const response = await fetch(`https://readwise.io/api/v2${url}`, {
    headers: {
      Authorization: `Token ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    ...options,
  });

  return response.json();
};
