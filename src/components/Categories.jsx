import { useState } from "react";

const Categories = () => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const [active, setActive] = useState(0);

  const setActiveHandler = (i) => {
    setActive(i);
  };

  return (
    <div class="categories">
      <ul>
        {categories.map((title, i) => (
          <li
            key={i}
            className={active === i ? "active" : null}
            onClick={() => setActiveHandler(i)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
