import { ThunkDispatch } from "@reduxjs/toolkit";
import { AppThunk, RootState } from ".";
import fetchResults from "../services/giphy/loader";
import {
  AppActionTypes,
  CLOSE_MODAL_IMAGE,
  ImageState,
  LOAD_FAILURE,
  LOAD_MORE,
  LOAD_NEW_QUERY,
  LOAD_SUCCESS,
  SHOW_MODAL_IMAGE,
} from "./types";

function startGiphyLoad(
  dispatch: ThunkDispatch<RootState, unknown, AppActionTypes>,
  state: RootState
) {
  fetchResults(state.app.query, state.app.images.length).then(
    (giphyResults) =>
      void dispatch(
        completeFetch(giphyResults.images, giphyResults.hasMoreImages)
      ),
    (e) => void dispatch(failFetch())
  );
}

export function loadNewQuery(query: string): AppThunk {
  return (dispatch, getState) => {
    // Dispatch the action first to update the query and set the loading state.
    dispatch({
      type: LOAD_NEW_QUERY,
      query,
    });
    startGiphyLoad(dispatch, getState());
  };
}

export function loadMore(): AppThunk {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_MORE,
    });
    startGiphyLoad(dispatch, getState());
  };
}

export function completeFetch(
  images: ImageState[],
  hasMoreImages: boolean
): AppActionTypes {
  return {
    type: LOAD_SUCCESS,
    images,
    hasMoreImages,
  };
}

export function failFetch(): AppActionTypes {
  return {
    type: LOAD_FAILURE,
  };
}

export function showModalImage(image: ImageState): AppActionTypes {
  return {
    type: SHOW_MODAL_IMAGE,
    image,
  };
}

export function closeModalImage(): AppActionTypes {
  return {
    type: CLOSE_MODAL_IMAGE,
  };
}
