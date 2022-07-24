import styles from "./Pagination.module.scss";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slices.js/filterSlice";
const Pagination = () => {
  const pagesCount = 3;

  const currentPage = useSelector((state) => state.filter.currentPage);
  const dispatch = useDispatch();

  const setPage = (page) => {
    console.log(page);
    dispatch(setCurrentPage(page));
  };

  function prevSelect() {
    const current = currentPage - 1;
    setPage(current < 1 ? 1 : current);
  }

  function nextSelect() {
    const current = currentPage + 1;
    setPage(current > pagesCount ? pagesCount : current);
  }

  return (
    <ul className={styles.pagination}>
      <li className={styles.previous} onClick={prevSelect}>
        <MdNavigateBefore />
      </li>
      {[...new Array(pagesCount)].map((e, i) => {
        return (
          <li
            key={i}
            className={currentPage - 1 === i ? styles.selected : null}
            onClick={() => {
              setPage(i + 1);
            }}
          >
            {i + 1}
          </li>
        );
      })}
      <li className={styles.next} onClick={nextSelect}>
        <MdNavigateNext />
      </li>
    </ul>
  );
};

export default Pagination;
