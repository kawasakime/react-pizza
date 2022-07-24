import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/slices.js/searchSlice";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import {BiSearchAlt2} from 'react-icons/bi'

const Search = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const updateSearch = useCallback(
    debounce((text) => {
      console.log(text);
      dispatch(update(text));
    }, 300),
    []
  );

  const handleUpdateSearch = (e) => {
    setValue(e.target.value);
    updateSearch(e.target.value);
  };

  return (
    <div className={styles.search}>
      <BiSearchAlt2 className={styles.search__ico}/>
      <input
        className={styles.search__input}
        type="text"
        placeholder="Поиск..."
        value={value}
        onChange={handleUpdateSearch}
      />
    </div>
  );
};

export default Search;
