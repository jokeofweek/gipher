import * as React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { loadMore } from "../store/actions";
import { ImageState, LoadState } from "../store/types";
import { ImageContainer } from "./ImageContainer";
import styles from './ImageStream.module.css';
import spinner from './spinner.svg';

/**
 * An infinitely-scrollable stream of Giphy images. 
 */
export const ImageStream: React.FC = () => {
  const dispatch = useDispatch();
  
  const images: readonly ImageState[] = useSelector(
    (state: RootState) => state.app.images,
    shallowEqual
  );

  const hasMoreImages: boolean = useSelector(
    (state: RootState) => state.app.hasMoreImages
  );

  const loadState: LoadState = useSelector(
    (state: RootState) => state.app.loadState
  );

  const scrollSentinelRef = React.createRef<HTMLDivElement>();

  // Set up the infinite scroll behavior. This will attempt to load more
  // whenever we still have images to load and are not in an error state.
  React.useEffect(() => {
    // If we don't have our sentinel, then we aren't using scrolling.
    if (!scrollSentinelRef.current) {
      return;
    }

    // Otherwise, we want to set up an intersection observer to kick off
    // a new load as soon as the sentinel appears.
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(loadMore());
      }
    });
    observer.observe(scrollSentinelRef.current!);

    // On cleanup.
    return () => {
      observer.disconnect();
    };
  });

  return (
    <div className={styles.imageStreamContainer}>
      <div className={styles.imageStream}>
        {images.map((image: ImageState) => (
          <ImageContainer key={image.id} image={image} />
        ))}
        {loadState == LoadState.LOADING && (
        <div className={styles.loadingSpinner}>
          <img src={spinner} alt="Loading spinner" />
        </div>
        )}
        {loadState == LoadState.ERROR && (
          <p className={styles.error}>
            An error occurred while fetching GIF data.
          </p>
        )}
        {hasMoreImages && loadState == LoadState.READY && (
          <div ref={scrollSentinelRef} className={styles.scrollSentinel}></div>
        )}
        {!hasMoreImages && <p>You've reached the end for this query :(</p>}
      </div>
    </div>
  );
};
