# Gipher

A Giphy viewer built using React/Redux/Typescript. Supports viewing trending gifs as well as searching. Clicking on an image will open a barebones modal viewer.

## Running locally

In order to run locally, requires a [Giphy API key](https://developers.giphy.com/docs/api/).

This API key needs to be passed in the `REACT_APP_GIPHY_API_KEY` environment variable.

This can be accomplished by adding a `.env` file to the root of this directory with the contents:

```
REACT_APP_GIPHY_API_KEY=...
```

## Remaining work

### Improvements 

Ideally, this should:
1. check the browser and use webp instead of mp4 for Chrome, as per the [Giphy rendition guide](https://developers.giphy.com/docs/optional-settings#rendition-guide).
1. provide a way to recover from errors... a manual retry button could work. It would dispatch a `LOAD_MORE` action.
1. use a proper modal dialog, with accessibility + focus wrapping.
1. have tests :) 

**Issues**

1. There is a race between fetching more and changing the query.  If my `LOAD_MORE` is very slow, such that a query update's request comes back first, the results will merge. Changing the query should cancel any ongoing `LOAD_MORE`. In practice, this could be managed with something like `redux-saga`.
