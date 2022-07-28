import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import qs from "qs";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaItem from "../components/PizzaItem";
import Skeleton from "../components/PizzaItem/Skeleton";
import Sort, { sortList } from "../components/Sort";
import { setFilters } from "../redux/slices/filterSlice";
import { getPizzasData } from "../redux/slices/pizzaSlice";
import { RootState, useAppDispatch } from "../redux/store";
import { SortProperty } from "../redux/types";

const Home: React.FC = () => {
  const { items: pizzas, status } = useSelector(
    (state: RootState) => state.pizza
  );
  const currentPage = useSelector(
    (state: RootState) => state.filter.currentPage
  );
  const { category, sort } = useSelector((state: RootState) => state.filter);
  const searchValue = useSelector((state: RootState) => state.search.value);

  const dispatch = useAppDispatch();

  const isSearch = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);

  const navigate = useNavigate();

  function getData() {
    const categoryQuery: string = category > 0 ? `category=${category}` : "";
    const sortBy: string = sort.param;
    const order: string = sort.order;

    dispatch(
      getPizzasData({
        categoryQuery,
        sortBy,
        order,
        currentPage: String(currentPage),
        searchValue,
      })
    );
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortParam: SortProperty = sortList.find(
        (obj) => obj.param === params.sortBy && obj.order === params.order
      );

      dispatch(
        setFilters({
          category: +params["category"],
          currentPage: +params["currentPage"],
          sort: sortParam,
        })
      );
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
