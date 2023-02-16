import React from "react";
import styles from "./Search.module.scss";
import CustomDiv from "../CustomDiv";
import searchIcon from "../../assets/img/search.svg";
import closeIcon from "../../assets/img/close.svg";

function Search({ searchValue, setSearchValue }) {
  return (
    <CustomDiv className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="search" />
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input}
        value={searchValue}
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <img
          className={styles.iconClose}
          onClick={() => setSearchValue("")}
          src={closeIcon}
          alt="close"
        />
      )}
    </CustomDiv>
  );
}

export default Search;
