import React, { useCallback, useRef, useState } from "react";
import styles from "./Search.module.scss";
import CustomDiv from "../CustomDiv";
import searchIcon from "../../assets/img/search.svg";
import closeIcon from "../../assets/img/close.svg";
// @ts-ignore
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slice/filterSlice";

function Search() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
