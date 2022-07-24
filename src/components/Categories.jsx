import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/slices.js/filterSlice";

const Categories = () => {

  const categoryId = useSelector((state) => state.filter.category)
  const dispatch = useDispatch();

  function handlerSetCategory(id) {
    dispatch(setCategory(id))
  }

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((title, i) => (
          <li
            key={i}
            className={categoryId === i ? "active" : null}
            onClick={() => handlerSetCategory(i)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
