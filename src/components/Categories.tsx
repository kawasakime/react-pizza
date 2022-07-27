import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";

const Categories: React.FC = () => {
  const categoryId = useSelector((state: RootState) => state.filter.category);
  const dispatch = useDispatch();

  function handlerSetCategory(id: number) {
    dispatch(setCategory(id));
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
            className={categoryId === i ? "active" : undefined}
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
