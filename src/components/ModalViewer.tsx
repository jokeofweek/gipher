import * as React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { closeModalImage } from "../store/actions";
import { ImageState } from "../store/types";
import styles from "./ModalViewer.module.css";

/** A bare-bones modal viewer for an image. */
export const ModalViewer: React.FC = () => {
  const modalImage: ImageState | null = useSelector(
    (state: RootState) => state.app.modalImage,
    shallowEqual
  );

  const dispatch = useDispatch();

  const handleCloseModal = (e: React.MouseEvent) => {
    dispatch(closeModalImage());
  };

  return (
    <div
      className={styles.modalViewer}
      style={{ display: !!modalImage ? "" : "none" }}
    >
      <div>
        <button onClick={handleCloseModal}>Close</button>
      </div>
      {modalImage && (
        <video
          loop
          muted
          autoPlay
          playsInline
          src={modalImage?.fullUrl}
        ></video>
      )}
    </div>
  );
};
