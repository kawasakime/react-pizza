import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaItem from "../components/PizzaItem";
import Skeleton from "../components/PizzaItem/Skeleton";
import Sort from "../components/Sort";
import { SearchContext } from "../App";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { category, sort } = useSelector((state) => state.filter);
  const searchValue = useSelector((state) => state.search.value);

  useEffect(() => {
    const categoryQuery = category > 0 ? `category=${category}` : "";
    const sortBy = sort.param;
    const order = sort.order;

    setIsLoading(true);
    axios
      .get(
        `https://62d9b7eb5d893b27b2ebff37.mockapi.io/items?page=${currentPage}&limit=4&search=${searchValue}&${categoryQuery}&sortBy=${sortBy}&order=${order}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sort, currentPage, searchValue]); // eslint-disable-line

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
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
