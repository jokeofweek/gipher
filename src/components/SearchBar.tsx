import React, { useCallback } from "react";

import { useDispatch } from "react-redux";
import { loadNewQuery } from "../store/actions";
import { debounce } from "lodash";
import styles from "./SearchBar.module.css";

/*
 * The number of milliseconds to wait after the user stops
 * typing before we dispatch the load action. This helps
 * prevent the UI changing repeatedly while the user is typing.
 */
const UPDATE_QUERY_DEBOUNCE_MS = 500;

/** A search bar which will request a new set of images whenever the user's query changes. */
export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const debounceLoadNewQuery = useCallback(
    debounce(
      (q: string) => dispatch(loadNewQuery(q)),
      UPDATE_QUERY_DEBOUNCE_MS
    ),
    []
  );

  const handleNewQuery = (e: React.FormEvent<HTMLInputElement>) => {
    debounceLoadNewQuery(e.currentTarget.value);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search query..."
        onChange={handleNewQuery}
      ></input>
    </div>
  );
};
