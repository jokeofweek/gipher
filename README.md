# Gipher

A Giphy viewer built using React/Redux/Typescript. Supports viewing trending gifs as well as searching. Clicking on an image will open a barebones modal viewer.

## Running locally

In order to run locally, requires a [Giphy API key](https://developers.giphy.com/docs/api/).

This API key needs to be passed in the `REACT_APP_GIPHY_API_KEY` environment variable.

This can be accomplished by adding a `.env` file to the root of this directory with the contents:

```
REACT_APP_GIPHY_API_KEY=...
```