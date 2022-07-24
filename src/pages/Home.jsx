import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import qs from "qs";
import axios from "axios";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaItem from "../components/PizzaItem";
import Skeleton from "../components/PizzaItem/Skeleton";
import Sort, { sortList } from "../components/Sort";
import { setFilters } from "../redux/slices.js/filterSlice";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const navigate = useNavigate();

  const currentPage = useSelector((state) => state.filter.currentPage);
  const { category, sort } = useSelector((state) => state.filter);
  const searchValue = useSelector((state) => state.search.value);

  const dispatch = useDispatch();

  function getData() {
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
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortParam = sortList.find((obj) => obj.param === params.sortBy && obj.order === params.order);

      dispatch(setFilters({ ...params, sort: sortParam }));
      isSearch.current = true;
    }
  }, []);

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
  }, [category, sort, currentPage]);

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
        <Pagination currentPage={currentPage} />
      </div>
    </div>
  );
};

export default Home;
