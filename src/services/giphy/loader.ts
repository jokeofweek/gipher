import { ImageState } from "../../store/types";
import { GifObject, GiphyResponse } from "./types";

if (!process.env.REACT_APP_GIPHY_API_KEY) {
  alert('Missing GIPHY API Key');
}
const API_KEY = process.env.REACT_APP_GIPHY_API_KEY!;
const LIMIT = 30;

/**
 * @returns A constructed URL for the Giphy API which will either
 *   search for the given query, or search the trending page when
 *   the query is empty, starting at a given offset.
 */
function buildQueryUrl(query: string, offset: number) {
  let endpoint: string;
  const params = new URLSearchParams({
    api_key: API_KEY,
    limit: LIMIT.toString(),
    offset: offset.toString(),
    rating: "g",
    lang: "en",
  });

  if (!!query) {
    endpoint = "search";
    params.append("q", query);
  } else {
    endpoint = "trending";
  }

  return `https://api.giphy.com/v1/gifs/${endpoint}?${params.toString()}`;
}

export interface GiphyResult {
  images: ImageState[];
  hasMoreImages: boolean;
}

/**
 * Load a page of results from Giphy.
 * @param query Used as search query for gifs. If empty string is passed, will use trending gifs instead.
 * @param offset Offset to begin paginating at.
 * @returns A promise containing the image metadata and whether there were more pages of data if the fetch succeeded.
 */
export default async function fetchResults(
  query: string,
  offset: number
): Promise<GiphyResult> {
  const response = await fetch(buildQueryUrl(query, offset));

  const parsedData: GiphyResponse = await response.json();

  // Test the result of the meta object, returning a failure if the code wasn't 200.
  if (parsedData.meta.status != 200) {
    throw new Error(`Request failed with code ${parsedData.meta.status}`);
  }

  const images = parsedData.data.map((gif: GifObject) => ({
    id: gif.id,
    previewUrl: gif.images.downsized_small.mp4,
    fullUrl: gif.images.original.mp4,
    title: gif.title,
  }));

  const hasMoreImages =
    parsedData.pagination.count + parsedData.pagination.offset <
    parsedData.pagination.total_count;

  return {
    images,
    hasMoreImages,
  };
}
