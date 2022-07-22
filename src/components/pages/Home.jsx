import { useEffect, useState } from "react";

import Categories from "../Categories";
import PizzaItem from "../PizzaItem";
import Skeleton from "../PizzaItem/Skeleton";
import Sort from "../Sort";

const Home = () => {

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const resource = fetch("https://62d9b7eb5d893b27b2ebff37.mockapi.io/items");

  useEffect(() => {
    resource
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
  }, []); // eslint-disable-line

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
            ? [...new Array(6)].map((e, i) => <Skeleton key={i} />)
            : pizzas.map((pizza, i) => <PizzaItem key={i} {...pizza} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
