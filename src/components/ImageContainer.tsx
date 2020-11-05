import * as React from "react";
import { useDispatch } from "react-redux";
import { showModalImage } from "../store/actions";
import { ImageState } from "../store/types";
import styles from "./ImageStream.module.css";

type Props = {
  image: ImageState;
};

/**
 * A single image within an image stream. Shows a modal of the image on click.
 * The <video> tag is used here as these are MP4 versions of the gif.
 */
export const ImageContainer: React.FC<Props> = ({ image }) => {
  const dispatch = useDispatch();

  const handleOpenModal = (e: React.MouseEvent) => {
    dispatch(showModalImage(image));
  };

  return (
    <video
      title={image.title}
      onClick={handleOpenModal}
      className={styles.imageContainer}
      loop
      muted
      autoPlay
      playsInline
      src={image.previewUrl}
    ></video>
  );
};
