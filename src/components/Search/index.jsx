import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/slices.js/searchSlice";
import styles from "./Search.module.scss";

const Search = () => {
  const value = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  const handleUpdateSearch = (e) => {
    dispatch(update(e.target.value));
  };

  return (
    <input
      className={styles.search}
      type="text"
      placeholder="Поиск..."
      value={value}
      onChange={handleUpdateSearch}
    />
  );
};

export default Search;
