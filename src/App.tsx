import React, { useEffect } from "react";
import { SearchBar } from "./components/SearchBar";
import { ModalViewer } from "./components/ModalViewer";
import { ImageStream } from "./components/ImageStream";
import styles from "./App.module.css";
import { useDispatch } from "react-redux";
import { loadNewQuery } from "./store/actions";

const App: React.FC = () => {
  const dispatch = useDispatch();

  // Kick off a load with the empty query on start.
  useEffect(() => {
    dispatch(loadNewQuery(""));
  }, []);

  return (
    <div className={styles.app}>
      <SearchBar />
      <ImageStream />
      <ModalViewer />
    </div>
  );
};

export default App;
