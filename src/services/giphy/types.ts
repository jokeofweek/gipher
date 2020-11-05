// Partial Giphy API types.
// Sourced from https://developers.giphy.com/docs/api/schema.

export interface ImageObject {
  mp4: string;
}

export interface Images {
  downsized_small: ImageObject;
  original: ImageObject;
}

export interface PaginationObject {
  count: number;
  total_count: number;
  offset: number;
}

export interface GifObject {
  id: string;
  title: string;
  images: Images;
  pagination: PaginationObject;
}

export interface MetaObject {
  status: number;
}

export interface GiphyResponse {
  data: GifObject[];
  pagination: PaginationObject;
  meta: MetaObject;
}
