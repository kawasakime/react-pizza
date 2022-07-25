import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import qs from "qs";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaItem from "../components/PizzaItem";
import Skeleton from "../components/PizzaItem/Skeleton";
import Sort, { sortList } from "../components/Sort";
import { setFilters } from "../redux/slices.js/filterSlice";
import { getPizzasData } from "../redux/slices.js/pizzaSlice";

const Home = () => {
  const { items: pizzas, status } = useSelector((state) => state.pizza);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const { category, sort } = useSelector((state) => state.filter);
  const searchValue = useSelector((state) => state.search.value);

  const dispatch = useDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const navigate = useNavigate();

  function getData() {
    const categoryQuery = category > 0 ? `category=${category}` : "";
    const sortBy = sort.param;
    const order = sort.order;

    dispatch(
      getPizzasData({
        categoryQuery,
        sortBy,
        order,
        currentPage,
        searchValue,
      })
    );
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortParam = sortList.find(
        (obj) => obj.param === params.sortBy && obj.order === params.order
      );

      dispatch(setFilters({ ...params, sort: sortParam }));
      isSearch.current = true;
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!isSearch.current) {
      getData();
    }

    isSearch.current = false;

    window.scrollTo(0, 0);
  }, [category, sort, currentPage, searchValue]); // eslint-disable-line

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort.param,
        order: sort.order,
        category,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [category, sort, currentPage]); // eslint-disable-line

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === "error" ? (
          <div className="content__error">
            <h2>Произошла ошибка :(</h2>
            <p>
              Не удалось получить данные о пиццах. Попробуйте позже или
              перезагрузите страницу.
            </p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading"
              ? [...new Array(4)].map((e, i) => <Skeleton key={i} />)
              : pizzas.map((pizza, i) => <PizzaItem key={i} pizza={pizza} />)}
          </div>
        )}

        <Pagination currentPage={currentPage} />
      </div>
    </div>
  );
};

export default Home;
