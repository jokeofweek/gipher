/** Enum representing the current loading state for the app. */
export enum LoadState {
  /* The app is ready and there is no pending load. */
  READY,
  /* A load is currently under way. */
  LOADING,
  /* An error occurred while loading. */
  ERROR,
}

/** Metadata from Giphy for an image. */
export interface ImageState {
  id: string;
  previewUrl: string;
  fullUrl: string;
  title: string;
}

export interface ApplicationState {
  query: string;
  loadState: LoadState;
  images: ImageState[];
  hasMoreImages: boolean;
  modalImage: ImageState | null;
}

export const LOAD_NEW_QUERY = "LOAD_NEW_QUERY";
export const LOAD_MORE = "LOAD_MORE";
export const LOAD_SUCCESS = "LOAD_SUCCESS";
export const LOAD_FAILURE = "LOAD_FAILURE";
export const SHOW_MODAL_IMAGE = "SHOW_MODAL_IMAGE";
export const CLOSE_MODAL_IMAGE = "CLOSE_MODAL_IMAGE";

/** Action used to indicate starting a load for content for a new query. */
export interface LoadNewQueryAction {
  type: typeof LOAD_NEW_QUERY;
  query: string;
}
/** Action used to indicate starting a load for more content for the given query. */
export interface LoadMoreAction {
  type: typeof LOAD_MORE;
}

/** Action indicating a successful content load. */
export interface LoadSuccessAction {
  type: typeof LOAD_SUCCESS;
  images: ImageState[];
  hasMoreImages: boolean;
}

/** Action indicating a failed content load. */
export interface LoadFailureAction {
  type: typeof LOAD_FAILURE;
}

/** Action indicating the modal should be shown for a given image. */
export interface ShowModalImageAction {
  type: typeof SHOW_MODAL_IMAGE;
  image: ImageState;
}

/** Action closing the modal image viewer. */
export interface CloseModalImageAction {
  type: typeof CLOSE_MODAL_IMAGE;
}

export type AppActionTypes =
  | LoadNewQueryAction
  | LoadMoreAction
  | LoadSuccessAction
  | LoadFailureAction
  | ShowModalImageAction
  | CloseModalImageAction;
