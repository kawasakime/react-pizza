import { useState } from "react";

const Categories = ({ category, setCategory }) => {
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
            className={category === i ? "active" : null}
            onClick={() => setCategory(i)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
