import styles from "./Pagination.module.scss";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
const Pagination = ({ currentPage, setCurrentPage }) => {
  const pagesCount = 3;

  function prevSelect() {
    const current = currentPage - 1;
    setCurrentPage(current < 1 ? 1 : current);
  }

  function nextSelect() {
    const current = currentPage + 1;
    setCurrentPage(current > pagesCount - 1 ? pagesCount : current);
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
            className={currentPage-1 === i ? styles.selected : null}
            onClick={() => {
              setCurrentPage(i+1);
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
