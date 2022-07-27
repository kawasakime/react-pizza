// import React from "react";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";

import { HiSortDescending, HiSortAscending } from "react-icons/hi";

type SortItem = {
  name: string;
  param: string;
  order: string;
};

enum Order {
  DESC = "desc",
  ASC = "asc",
}

export const sortList: SortItem[] = [
  { name: "популярности", param: "rating", order: Order.DESC },
  { name: "популярности", param: "rating", order: Order.ASC },
  { name: "цене", param: "price", order: Order.DESC },
  { name: "цене", param: "price", order: Order.ASC },
  { name: "алфавиту", param: "title", order: Order.DESC },
  { name: "алфавиту", param: "title", order: Order.ASC },
];

const Sort: React.FC = () => {
  const [openSort, setOpenSort] = useState<boolean>(false);

  const currentSort = useSelector((state: RootState) => state.filter.sort);
  const dispatch = useDispatch();

  const sortRef = useRef<HTMLDivElement>(null);

  const selectSortHandler = (sort: SortItem) => {
    dispatch(setSort(sort));
    setOpenSort(false);
  };

  useEffect(() => {
    function handlerRemoveSortPopup(event: MouseEvent) {
      if (!event.composedPath().includes(sortRef.current)) {
        setOpenSort(false);
      }
    }
    document.body.addEventListener("click", (e) => handlerRemoveSortPopup(e));

    return () =>
      document.body.removeEventListener("click", handlerRemoveSortPopup);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpenSort(!openSort)}>{currentSort.name}</span>
      </div>
      {openSort && (
        <div className="sort__popup">
          <ul>
            {sortList.map((sort, i) => (
              <li
                key={i}
                className={
                  currentSort.name === sort.name &&
                  currentSort.order === sort.order
                    ? "active"
                    : undefined
                }
                onClick={() => selectSortHandler(sort)}
              >
                {sort.name}
                {sort.order === Order.DESC ? (
                  <HiSortDescending />
                ) : (
                  <HiSortAscending />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
