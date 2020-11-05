import { combineReducers } from "@reduxjs/toolkit";
import {
  AppActionTypes,
  ApplicationState,
  CLOSE_MODAL_IMAGE,
  LOAD_NEW_QUERY,
  LOAD_SUCCESS,
  LOAD_MORE,
  LoadState,
  LOAD_FAILURE,
  SHOW_MODAL_IMAGE,
} from "./types";

const initialState: ApplicationState = {
  query: "",
  loadState: LoadState.READY,
  images: [],
  hasMoreImages: false,
  modalImage: null,
};

function appReducer(
  state = initialState,
  action: AppActionTypes
): ApplicationState {
  switch (action.type) {
    case LOAD_NEW_QUERY: {
      return {
        ...state,
        query: action.query,
        loadState: LoadState.LOADING,
        images: [],
        hasMoreImages: true,
      };
    }
    case LOAD_MORE:
      return {
        ...state,
        loadState: LoadState.LOADING,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loadState: LoadState.READY,
        images: state.images.concat(action.images),
        hasMoreImages: action.hasMoreImages,
      };
    case LOAD_FAILURE:
      return {
        ...state,
        loadState: LoadState.ERROR,
      };
    case SHOW_MODAL_IMAGE:
      return {
        ...state,
        modalImage: action.image,
      };
    case CLOSE_MODAL_IMAGE:
      return {
        ...state,
        modalImage: null,
      };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({ app: appReducer });
