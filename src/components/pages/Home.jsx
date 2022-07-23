import { useEffect, useState } from "react";

import Categories from "../Categories";
import Pagination from "../Pagination";
import PizzaItem from "../PizzaItem";
import Skeleton from "../PizzaItem/Skeleton";
import Sort from "../Sort";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [currentSort, setCurrentSort] = useState({
    name: "популярности",
    param: "rating",
  });

  useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = currentSort.param;
    const order = currentSort.order;

    setIsLoading(true);
    fetch(
      `https://62d9b7eb5d893b27b2ebff37.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, currentSort, currentPage]); // eslint-disable-line

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories category={categoryId} setCategory={setCategoryId} />
          <Sort currentSort={currentSort} setCurrentSort={setCurrentSort} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(4)].map((e, i) => <Skeleton key={i} />)
            : pizzas.map((pizza, i) => <PizzaItem key={i} {...pizza} />)}
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default Home;
