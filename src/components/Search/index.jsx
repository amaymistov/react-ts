import React, { useCallback, useContext, useRef, useState } from "react";
import styles from "./Search.module.scss";
import CustomDiv from "../CustomDiv";
import searchIcon from "../../assets/img/search.svg";
import closeIcon from "../../assets/img/close.svg";
import { AppContext } from "../../App";
import debounce from "lodash.debounce";

function Search() {
  const [value, setValue] = useState("");
  const { setSearchValue } = useContext(AppContext);
  const inputRef = useRef(null);

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <CustomDiv className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="search" />
      <input
        ref={inputRef}
        onChange={(e) => onChangeInput(e)}
        className={styles.input}
        value={value}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <img
          className={styles.iconClose}
          onClick={onClickClear}
          src={closeIcon}
          alt="close"
        />
      )}
    </CustomDiv>
  );
}

export default Search;
