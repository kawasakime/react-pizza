import React from "react";

import styles from "./Pagination.module.scss";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";

type PaginationState = {
  currentPage: number
}

const Pagination: React.FC<PaginationState> = ({currentPage}) => {
  const pagesCount: number = 3;
  const dispatch = useDispatch();

  const setPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  function prevSelect(event: React.MouseEvent) {
    const current: number = currentPage - 1;
    setPage(current < 1 ? 1 : current);
  }

  function nextSelect(event: React.MouseEvent) {
    const current: number = currentPage + 1;
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
            className={currentPage - 1 === i ? styles.selected : undefined}
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
