import { getArticle, Raindrop, RaindropHighlight } from "./raindrop-client.ts";
import { ReadwiseHighlight, saveHighlights } from "./readwise-client.ts";
import { validString } from "./utils.ts";

const raindropArticleToReadwise = (raindrop: Raindrop): ReadwiseHighlight[] => {
  const title = raindrop.title;
  const sourceUrl = raindrop.link;

  return raindrop.highlights.map((item) =>
    raindropHighlightToReadwise(item, title, sourceUrl)
  );
};

const raindropHighlightToReadwise = (
  highlight: RaindropHighlight,
  title: string,
  sourceUrl: string
): ReadwiseHighlight => ({
  text: highlight.text,
  title: title,
  author: null,
  source_url: sourceUrl,
  category: "articles",
  highlighted_at: highlight.created,
  color: highlight.color,
});

const articleId = prompt("Enter article id:");

if (!validString(articleId)) {
  throw new Error("Invalid article id");
}

const article = await getArticle(articleId);
// console.log(article);

let highlights = raindropArticleToReadwise(article);

if (
  confirm("Import only red highlights? Choosing no will import all colors.")
) {
  highlights = highlights.filter((highlight) => highlight.color === "red");
}

// console.log(highlights);

if (
  confirm(
    `${highlights.length} highlight will be imported to Readwise. Do you wish to continue?`
  )
) {
  const result = await saveHighlights(highlights);
  console.log(result);
}
