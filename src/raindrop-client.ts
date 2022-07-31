const AUTH_TOKEN = Deno.env.get("RAINDROP_API_TOKEN");
const RAINDROP_BASE_URI = "https://api.raindrop.io/rest/v1";

if (typeof AUTH_TOKEN === "undefined") {
  throw new Error("RAINDROP_API_TOKEN is not set");
}

export type Raindrop = {
  removed: boolean;
  highlights: RaindropHighlight[];
  link: string;
  title: string;
};

export type RaindropHighlight = {
  text: string;
  note: string;
  color: "red" | "yellow" | "green" | "blue";
  created: string;
  lastUpdate: string;
  creatorRef: unknown;
  _id: string;
};

export const getMostRecentArticles = (): Promise<Raindrop[]> =>
  baseRequest("/raindrops/0");

export const getArticle = async (id: string): Promise<Raindrop> =>
  (await baseRequest(`/raindrop/${id}`)).item;

const baseRequest = async (url: string) => {
  const response = await fetch(`${RAINDROP_BASE_URI}${url}`, {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return await response.json();
};
